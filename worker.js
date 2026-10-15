/* 교사 잠금 (Cloudflare Workers, 설정은 wrangler.jsonc)
   모든 요청이 이 코드를 먼저 거친 뒤 사이트 파일(env.ASSETS)을 받아 옵니다.
   비밀번호는 코드에 적지 않습니다. Cloudflare 대시보드 → science → Settings → Build → Variables and secrets 에
   TEACHER_PASSWORD (Secret)로 넣고 다시 배포하세요. (워커 실행 변수에 넣어도 됩니다.)
   비밀번호를 바꾸면 기존 교사 로그인은 모두 풀립니다.

   학생(로그인 안 한 사람)에게는 서버에서 아래를 지운 뒤 페이지를 보냅니다. 페이지 소스를 열어도 보이지 않습니다.
   - 학습지: 빈칸 정답, 정답 문장(.ans-only), 정답 그래프(.ans-svg, data-ans), '정답 보기' 버튼
   - 수업 슬라이드(slides*.html), 수업 진행 도구(tools/class.html): 교사 로그인 화면으로 보냄
   골든벨 '교사 진행' 모드는 화면에서 숨깁니다(window.IS_TEACHER). */

import {TEACHER_TOKEN} from './.teacher.js';   // 배포 때 build-teacher.mjs가 만듦

const COOKIE = 'sci_teacher';
const MAX_AGE = 60 * 60 * 24 * 30;          // 30일
const TEACHER_ONLY = [/^\/tools\/class(\.html)?$/, /\/slides\d*(\.html)?$/];   // 수업 진행 도구, 수업 슬라이드 전체

export default {
  fetch(request, env) { return handle(request, env); }
};

async function handle(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

    if (path === '/teacher' || path === '/teacher/') return loginRoute(request, env, url);
  if (path === '/teacher/logout') return new Response(null, {status: 302, headers: {Location: '/', 'Set-Cookie': `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`, 'Cache-Control': 'no-store'}});

  const isTeacher = await checkCookie(request, env);
  if (!isTeacher && TEACHER_ONLY.some(r => r.test(path))) {
    return new Response(null, {status: 302, headers: {Location: '/teacher?next=' + encodeURIComponent(path + url.search), 'Cache-Control': 'no-store'}});
  }

  const res = await env.ASSETS.fetch(request);
  const type = res.headers.get('content-type') || '';
  if (!type.includes('text/html')) return res;

  const headers = new Headers(res.headers);
  headers.set('Cache-Control', 'private, no-cache');
  headers.append('Vary', 'Cookie');
  let out = new Response(res.body, {status: res.status, statusText: res.statusText, headers});

  // 슬라이드 원고에서 교사 메모 줄 지우기 (원고는 <script type="text/plain" id="deck"> 안의 글)
  if (!isTeacher && /\/slides\d*(\.html)?$/.test(path)) {
    const html = await out.text();
    const cleaned = html.replace(/(<script type="text\/plain" id="deck">)([\s\S]*?)(<\/script>)/, (m, a, body, c) => a + body.split('\n').filter(l => !/^\s*% /.test(l)).join('\n') + c);
    out = new Response(cleaned, {status: res.status, statusText: res.statusText, headers});
  }

  let rw = new HTMLRewriter().on('head', {element(e) { e.prepend(`<script>window.IS_TEACHER=${isTeacher};</script>`, {html: true}); }});
  if (!isTeacher) {
    rw = rw
      .on('.ans-only', {element(e) { e.remove(); }})
      .on('.ans-svg', {element(e) { e.remove(); }})
      .on('button[data-ans]', {element(e) { e.remove(); }})
      .on('[data-ans]', {element(e) { e.removeAttribute('data-ans'); }})
      .on('.blank', {text(t) { if (t.text) t.replace([...t.text].map(() => '　').join('')); }});
  }
  return rw.transform(out);
}

async function hash(s) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
const token = pw => hash(pw + '|science-teacher-v1');

// 정답 지문: 실행 변수(env.TEACHER_PASSWORD)가 있으면 그것, 없으면 배포 때 만든 지문
async function expected(env) { return env.TEACHER_PASSWORD ? token(env.TEACHER_PASSWORD) : TEACHER_TOKEN; }

async function checkCookie(request, env) {
  const exp = await expected(env); if (!exp) return false;
  const m = (request.headers.get('cookie') || '').match(new RegExp(`(?:^|;\\s*)${COOKIE}=([0-9a-f]{64})`));
  if (!m) return false;
  return same(m[1], exp);
}
function same(a, b) { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; }

function safeNext(n) { return n && n.startsWith('/') && !n.startsWith('//') && !n.startsWith('/teacher') ? n : '/'; }

async function loginRoute(request, env, url) {
  const next = safeNext(url.searchParams.get('next'));
  if (!(await expected(env))) return page('교사 비밀번호가 아직 설정되지 않았어요. Cloudflare Build 설정에 TEACHER_PASSWORD를 넣고 다시 배포해 주세요.', next, true);
  if (request.method === 'POST') {
    const form = await request.formData();
    const pw = String(form.get('pw') || '');
    const to = safeNext(String(form.get('next') || '/'));
    if (pw && same(await token(pw), await expected(env))) {
      return new Response(null, {status: 303, headers: {Location: to, 'Set-Cookie': `${COOKIE}=${await token(pw)}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`, 'Cache-Control': 'no-store'}});
    }
    await new Promise(r => setTimeout(r, 800));
    return page('비밀번호가 맞지 않아요. 다시 입력해 주세요.', to);
  }
  if (await checkCookie(request, env)) return page(null, next, false, true);
  return page(null, next);
}

function esc(s) { return String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c])); }

function page(msg, next, disabled, already) {
  const body = already
    ? `<h1>교사 모드로 들어와 있어요</h1><p class="d">학습지 정답, 수업 슬라이드, 골든벨 진행, 수업 진행 도구를 쓸 수 있어요. 이 기기에서 30일 동안 유지돼요.</p>
       <a class="go" href="${esc(next)}">계속하기</a><a class="out" href="/teacher/logout">교사 모드 끝내기</a>`
    : `<h1>교사 로그인</h1><p class="d">학습지 정답, 수업 슬라이드, 골든벨 진행, 수업 진행 도구는 선생님만 볼 수 있어요.</p>
       ${msg ? `<p class="err" role="alert">${esc(msg)}</p>` : ''}
       <form method="post" action="/teacher"><input type="hidden" name="next" value="${esc(next)}">
       <label for="pw">교사 비밀번호</label><input id="pw" name="pw" type="password" autocomplete="current-password" required ${disabled ? 'disabled' : 'autofocus'}>
       <button type="submit" ${disabled ? 'disabled' : ''}>로그인</button></form>
       <a class="out" href="${esc(next)}">학생 화면으로 돌아가기</a>`;
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>교사 로그인 · 중·고 과학 실험실</title><meta name="robots" content="noindex"><meta name="theme-color" content="#1d3557">
<link rel="icon" type="image/png" href="/icons/icon-192.png"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;700&display=swap">
<style>
:root{--bg:#eef1f4;--grid:#e1e6ec;--surface:#fff;--ink:#151d26;--muted:#5a6774;--line:#d5dce3;--accent:#1d3557;--accent-ink:#fff;--hot:#c2321f}
@media (prefers-color-scheme:dark){:root{--bg:#0d1217;--grid:#17202a;--surface:#141b22;--ink:#e4eaf0;--muted:#93a2b0;--line:#27323d;--accent:#9cc0ff;--accent-ink:#0d1217;--hot:#ff6e5c;color-scheme:dark}}
*{box-sizing:border-box}html,body{margin:0;min-height:100%}
body{background-color:var(--bg);background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:24px 24px;color:var(--ink);font:15px/1.6 "IBM Plex Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif;word-break:keep-all;display:grid;place-items:center;min-height:100vh;padding:20px}
.card{width:100%;max-width:380px;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:28px 24px;display:flex;flex-direction:column;gap:14px}
.logo{display:flex;gap:10px;align-items:center;font-weight:700;color:var(--muted);font-size:14px;text-decoration:none}.logo img{width:32px;height:32px;border-radius:8px}
h1{margin:4px 0 0;font-size:24px;letter-spacing:-.01em}.d{margin:0;color:var(--muted);font-size:14px}
form{display:flex;flex-direction:column;gap:8px;margin-top:4px}label{font-size:13px;font-weight:500}
input{font:inherit;font-size:16px;padding:11px 12px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink)}
button,.go{font:inherit;font-weight:700;border:0;border-radius:10px;padding:12px;background:var(--accent);color:var(--accent-ink);cursor:pointer;text-align:center;text-decoration:none;margin-top:4px}
button:disabled{opacity:.45;cursor:not-allowed}
.out{font-size:13px;color:var(--muted);text-align:center}
.err{margin:0;padding:10px 12px;border-radius:10px;background:color-mix(in srgb,var(--hot) 12%,transparent);color:var(--hot);font-size:14px;font-weight:500}
:focus-visible{outline:2px solid #2b5bd7;outline-offset:2px}
</style></head><body><main class="card"><a class="logo" href="/"><img src="/icons/icon-192.png" alt="">중·고 과학 실험실</a>${body}</main></body></html>`;
  return new Response(html, {status: msg && !disabled ? 401 : 200, headers: {'content-type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store'}});
}
