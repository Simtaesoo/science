/* 실험·게임 앱 공통 도구 (AppKit)
   - 시작 화면(방법·옵션) → 놀이 화면(무대 캔버스 + 옆 패널) → 결과 화면
   - 효과음, 색종이, 말풍선, 점수·레벨·여러 명 차례, 최고 기록 저장 */
window.AppKit = (cfg) => {
  const $ = s => document.querySelector(s);
  const el = (tag, attrs, html) => { const e = document.createElement(tag); Object.entries(attrs || {}).forEach(([k, v]) => k === 'class' ? e.className = v : e.setAttribute(k, v)); if (html != null) e.innerHTML = html; return e; };
  const store = { get(k, d){ try { const v = localStorage.getItem('sciapp:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v){ try { localStorage.setItem('sciapp:' + k, JSON.stringify(v)); } catch (e) {} } };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 소리 ---------- */
  let ac = null, muted = store.get('muted', false);
  function tone(f, d, type, vol, slide, delay){ if (muted) return; try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const t = ac.currentTime + (delay || 0), o = ac.createOscillator(), g = ac.createGain(); o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d); g.gain.setValueAtTime(vol || .12, t); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g).connect(ac.destination); o.start(t); o.stop(t + d + .02); } catch (e) {} }
  function noise(d, vol){ if (muted) return; try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const n = ac.sampleRate * d, buf = ac.createBuffer(1, n, ac.sampleRate), ch = buf.getChannelData(0); for (let i = 0; i < n; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / n); const s = ac.createBufferSource(), g = ac.createGain(); s.buffer = buf; g.gain.value = vol || .08; s.connect(g).connect(ac.destination); s.start(); } catch (e) {} }
  const sfx = {
    click(){ tone(660, .06, 'triangle', .08); }, pop(){ tone(880, .08, 'sine', .1, 1320); },
    ok(){ tone(660, .1, 'triangle', .12); tone(990, .16, 'triangle', .12, null, .09); },
    bad(){ tone(180, .25, 'sawtooth', .07, 110); }, tick(){ tone(1200, .03, 'square', .04); },
    win(){ [523, 659, 784, 1046].forEach((f, i) => tone(f, .22, 'triangle', .12, null, i * .1)); },
    whoosh(){ noise(.3, .06); }, drip(){ tone(1400, .12, 'sine', .08, 500); }, bubble(){ tone(300 + Math.random() * 300, .1, 'sine', .06, 900); },
    zap(){ tone(1600, .15, 'square', .05, 200); }
  };

  /* ---------- 뼈대 ---------- */
  document.body.innerHTML = '';
  const hud = el('header', {class: 'hud'});
  hud.innerHTML = `<a class="back" href="${cfg.back || '../../index.html'}">← 목록</a><div class="ttl"></div><div class="chips"><span class="chip" id="cLevel" hidden>레벨 <b>1</b></span><span class="chip" id="cScore" hidden>점수 <b>0</b></span><span class="chip" id="cTime" hidden>⏱ <b>0</b></span><button class="iconbtn" id="mute" aria-label="소리 켜기/끄기"></button></div>`;
  hud.querySelector('.ttl').textContent = cfg.title;
  document.body.appendChild(hud);
  const sStart = el('main', {class: 'screen', id: 'sStart'}), sPlay = el('main', {class: 'screen', id: 'sPlay', hidden: ''}), sEnd = el('main', {class: 'screen', id: 'sEnd', hidden: ''});
  document.body.append(sStart, sPlay, sEnd);
  const fx = el('canvas', {class: 'fx', 'aria-hidden': 'true'}); document.body.appendChild(fx);
  const muteBtn = $('#mute'), setMute = m => { muted = m; store.set('muted', m); muteBtn.textContent = m ? '🔇' : '🔊'; };
  setMute(muted); muteBtn.onclick = () => { setMute(!muted); sfx.click(); };

  const squiggle = '<svg class="squiggle" viewBox="0 0 180 14" aria-hidden="true"><path d="M2 9 C 20 2, 30 13, 48 7 S 78 2, 96 8 S 128 13, 146 6 S 170 4, 178 8" fill="none" stroke="#f6d365" stroke-width="4" stroke-linecap="round"/></svg>';
  const opts = {}; (cfg.options || []).forEach(o => opts[o.key] = store.get(cfg.id + ':' + o.key, o.def));
  function renderStart(){
    const best = store.get(cfg.id + ':best', null);
    sStart.innerHTML = `<div class="card"><span class="unit-tag">${cfg.unit || ''}</span><h1 class="title-big"></h1>${squiggle}<p class="lead"></p><ol class="howto"></ol><div id="optBox"></div><button class="go" id="goBtn">${cfg.startLabel || '시작하기'}</button>${best != null ? `<div class="best">이 기기 최고 기록: ${best}</div>` : ''}</div>`;
    sStart.querySelector('.title-big').textContent = cfg.title; sStart.querySelector('.lead').innerHTML = cfg.lead || '';
    const ol = sStart.querySelector('.howto'); (cfg.howto || []).forEach(h => { const li = el('li'); li.innerHTML = h; ol.appendChild(li); });
    const box = sStart.querySelector('#optBox');
    (cfg.options || []).forEach(o => { const row = el('div', {class: 'opt'}); row.appendChild(el('span', {class: 'lbl'}, o.label));
      o.choices.forEach(([v, n]) => { const b = el('button', {class: 'pill', type: 'button', 'aria-pressed': String(opts[o.key] === v)}, n); b.onclick = () => { opts[o.key] = v; store.set(cfg.id + ':' + o.key, v); row.querySelectorAll('.pill').forEach(x => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); sfx.click(); }; row.appendChild(b); });
      box.appendChild(row); });
    sStart.querySelector('#goBtn').onclick = () => { sfx.ok(); start(); };
  }

  /* 놀이 화면 */
  sPlay.innerHTML = `<div class="stage-wrap"><div><div class="stage${cfg.dark ? ' dark' : ''}" id="stage"><canvas id="cv"></canvas><div class="toast" id="toast"></div></div></div><aside class="side" id="side"></aside></div>`;
  const stage = sPlay.querySelector('#stage'), cv = sPlay.querySelector('#cv'), side = sPlay.querySelector('#side'), toastEl = sPlay.querySelector('#toast');
  const S = {cv, g: cv.getContext('2d'), w: 0, h: 0};
  function fit(){ const r = stage.getBoundingClientRect(), d = devicePixelRatio || 1; if (!r.width) return; cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); S.g.setTransform(d, 0, 0, d, 0, 0); S.w = r.width; S.h = r.height; api.onResize && api.onResize(); }
  new ResizeObserver(fit).observe(stage);

  /* 포인터: 무대 좌표로 변환, 길게 누르기 지원 */
  function pointer(h){ let down = null, lp = null;
    const pos = e => { const r = stage.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    stage.addEventListener('pointerdown', e => { stage.setPointerCapture(e.pointerId); down = pos(e); const p = down; lp = setTimeout(() => { lp = null; h.long && h.long(...p); down = null; }, 550); h.down && h.down(...p, e); });
    stage.addEventListener('pointermove', e => { const p = pos(e); if (down && lp && Math.hypot(p[0] - down[0], p[1] - down[1]) > 8) { clearTimeout(lp); lp = null; } h.move && h.move(...p, !!down, e); });
    const up = e => { if (lp) { clearTimeout(lp); lp = null; if (down) h.tap && h.tap(...down, e); } if (down) h.up && h.up(...pos(e), e); down = null; };
    stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', () => { if (lp) clearTimeout(lp); down = null; });
  }

  /* 패널 */
  function panel(title, html){ const p = el('section', {class: 'panel-c'}); if (title) p.appendChild(el('h3', {}, title)); const body = el('div'); if (html != null) body.innerHTML = html; p.appendChild(body); side.appendChild(p); return body; }

  /* 말풍선·색종이 */
  let tt = null; function toast(msg, kind){ toastEl.textContent = msg; toastEl.className = 'toast on ' + (kind || ''); clearTimeout(tt); tt = setTimeout(() => toastEl.className = 'toast', 1600); }
  const fg = fx.getContext('2d'); let parts = [];
  function confetti(n){ if (reduce) return; const W = innerWidth, H = innerHeight, d = devicePixelRatio || 1; fx.width = W * d; fx.height = H * d; fg.setTransform(d, 0, 0, d, 0, 0); const cols = ['#f6d365', '#f28c7a', '#8ecdf2', '#9be3b5', '#c7b3f2', '#f2efe4'];
    for (let i = 0; i < (n || 120); i++) parts.push({x: W / 2 + (Math.random() - .5) * 200, y: H * .35, vx: (Math.random() - .5) * 12, vy: -Math.random() * 12 - 4, r: Math.random() * 6, c: cols[i % 6], a: Math.random() * 6, s: 4 + Math.random() * 6}); }
  (function fxLoop(){ if (parts.length) { fg.clearRect(0, 0, innerWidth, innerHeight); parts.forEach(p => { p.vy += .35; p.x += p.vx; p.y += p.vy; p.a += .2; fg.save(); fg.translate(p.x, p.y); fg.rotate(p.a); fg.fillStyle = p.c; fg.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); fg.restore(); }); parts = parts.filter(p => p.y < innerHeight + 20); if (!parts.length) fg.clearRect(0, 0, innerWidth, innerHeight); } requestAnimationFrame(fxLoop); })();

  /* 점수·차례·시간 */
  const state = {players: [], turn: 0, level: 0, t0: 0, timer: null, running: false};
  const cL = $('#cLevel'), cS = $('#cScore'), cT = $('#cTime');
  function setLevel(i, total){ state.level = i; cL.hidden = false; cL.querySelector('b').textContent = total ? `${i + 1}/${total}` : i + 1; }
  function addScore(n){ const p = state.players[state.turn]; p.score += n; cS.hidden = false; cS.querySelector('b').textContent = p.score; renderPlayers(); }
  let playersBox = null;
  function renderPlayers(){ if (!playersBox) return; playersBox.innerHTML = state.players.map((p, i) => `<div class="p${i === state.turn && state.players.length > 1 ? ' turn' : ''}"><span>${p.name}</span><b>${p.score}</b></div>`).join(''); }
  function nextTurn(){ if (state.players.length < 2) return; state.turn = (state.turn + 1) % state.players.length; cS.querySelector('b').textContent = state.players[state.turn].score; renderPlayers(); toast(`${state.players[state.turn].name} 차례!`); }
  function startTimer(){ state.t0 = performance.now(); cT.hidden = false; clearInterval(state.timer); state.timer = setInterval(() => cT.querySelector('b').textContent = Math.floor((performance.now() - state.t0) / 1000), 250); }
  function elapsed(){ return (performance.now() - state.t0) / 1000; }
  function stopTimer(){ clearInterval(state.timer); return elapsed(); }

  /* 시작·종료 */
  function start(){ side.innerHTML = ''; playersBox = null; const n = +(opts.players || 1);
    state.players = Array.from({length: n}, (_, i) => ({name: n > 1 ? ['🟡 1모둠', '🔴 2모둠', '🔵 3모둠', '🟢 4모둠'][i] : '나', score: 0})); state.turn = 0;
    cS.querySelector('b').textContent = 0; cL.hidden = cS.hidden = cT.hidden = true;
    sStart.hidden = true; sEnd.hidden = true; sPlay.hidden = false; window.scrollTo(0, 0);
    if (n > 1) { playersBox = panel('점수판'); playersBox.className = 'players'; renderPlayers(); }
    requestAnimationFrame(() => { fit(); api.onStart && api.onStart(Object.assign({}, opts)); });
  }
  function finish(r){ stopTimer(); r = r || {}; sPlay.hidden = true; sEnd.hidden = false; window.scrollTo(0, 0);
    const stars = r.stars == null ? 3 : r.stars, multi = state.players.length > 1;
    if (r.best != null) { const prev = store.get(cfg.id + ':best', null); if (prev == null || (cfg.bestLower ? r.bestValue < store.get(cfg.id + ':bestv', 1e9) : r.bestValue > store.get(cfg.id + ':bestv', -1e9))) { store.set(cfg.id + ':best', r.best); store.set(cfg.id + ':bestv', r.bestValue); } }
    const ranked = state.players.slice().sort((a, b) => b.score - a.score);
    sEnd.innerHTML = `<div class="card"><span class="unit-tag">${cfg.unit || ''}</span><h1 class="title-big">${r.title || (stars >= 3 ? '완벽해요!' : stars >= 2 ? '잘했어요!' : '조금 더 해 볼까요?')}</h1>${squiggle}
      ${multi ? '' : `<div class="stars">${[0, 1, 2].map(i => `<span class="${i < stars ? 'on' : ''}">⭐</span>`).join('')}</div>`}
      <p class="lead">${r.summary || ''}</p>
      ${multi ? `<table class="rank">${ranked.map((p, i) => `<tr><td>${['🥇', '🥈', '🥉', '4위'][i]} ${p.name}</td><td>${p.score}</td></tr>`).join('')}</table>` : ''}
      ${cfg.recap ? `<div class="recap">${cfg.recap}</div>` : ''}
      <div class="result-row"><button class="go" id="again">다시 하기</button><button class="ghost" id="toStart">처음 화면</button>${cfg.sim ? `<a class="ghost" href="${cfg.sim}" style="text-decoration:none;display:inline-flex;align-items:center">시뮬레이션으로 개념 보기</a>` : ''}</div></div>`;
    sEnd.querySelector('#again').onclick = () => { sfx.click(); start(); }; sEnd.querySelector('#toStart').onclick = () => { sfx.click(); sEnd.hidden = true; renderStart(); sStart.hidden = false; };
    if (stars >= 2 || multi) { sfx.win(); confetti(stars >= 3 ? 180 : 90); } }

  /* 반복 그리기 */
  let last = performance.now();
  (function loop(now){ const dt = Math.max(0, Math.min(.05, (now - last) / 1000)); last = now; if (!sPlay.hidden && S.w) { api.step && api.step(dt); api.draw && api.draw(S.g, S.w, S.h); } requestAnimationFrame(loop); })(last);

  /* 객관식 질문: 보기를 섞어서 보여 주고, 맞히면 onRight */
  function quiz(target, q, choices, ans, cb){ cb = cb || {}; const ord = choices.map((_, i) => i).sort(() => Math.random() - .5);
    target.innerHTML = `<p style="margin-bottom:8px">${q}</p>` + ord.map(i => `<button class="tool" style="width:100%;margin:4px 0;text-align:left;justify-content:flex-start" data-i="${i}" type="button">${choices[i]}</button>`).join('');
    let tries = 0; target.querySelectorAll('button').forEach(b => b.onclick = () => { const i = +b.dataset.i; tries++;
      if (i === ans) { sfx.ok(); toast('정답!', 'good'); target.innerHTML = `<p>✔ ${choices[ans]}</p>${cb.explain ? `<p class="note-c" style="margin-top:6px">${cb.explain}</p>` : ''}`; cb.onRight && cb.onRight(tries); }
      else { sfx.bad(); b.disabled = true; toast('다시 생각해 보세요', 'bad'); cb.onWrong && cb.onWrong(); } }); }

  const api = {S, stage, quiz, side, panel, pointer, toast, confetti, sfx, store, el, opts, state, setLevel, addScore, nextTurn, startTimer, stopTimer, elapsed, finish, start, reduce,
    get player(){ return state.players[state.turn]; }, get multi(){ return state.players.length > 1; }, onStart: null, step: null, draw: null, onResize: null};
  renderStart();
  return api;
};

/* 그리기 도우미 */
window.Draw = {
  rr(g, x, y, w, h, r){ g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); },
  text(g, t, x, y, o){ o = o || {}; g.font = `${o.weight || 400} ${o.size || 14}px ${o.display ? "'Jua'," : ''}'IBM Plex Sans KR',sans-serif`; g.fillStyle = o.color || '#2b2a26'; g.textAlign = o.align || 'center'; g.textBaseline = o.base || 'middle'; if (o.stroke) { g.lineWidth = o.strokeW || 4; g.strokeStyle = o.stroke; g.lineJoin = 'round'; g.strokeText(t, x, y); } g.fillText(t, x, y); },
  arrow(g, x0, y0, x1, y1, col, w){ const a = Math.atan2(y1 - y0, x1 - x0), L = Math.hypot(x1 - x0, y1 - y0), hd = Math.min(12, L * .4); g.strokeStyle = g.fillStyle = col; g.lineWidth = w || 3; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1 - Math.cos(a) * hd * .6, y1 - Math.sin(a) * hd * .6); g.stroke(); g.beginPath(); g.moveTo(x1, y1); g.lineTo(x1 - Math.cos(a - .45) * hd, y1 - Math.sin(a - .45) * hd); g.lineTo(x1 - Math.cos(a + .45) * hd, y1 - Math.sin(a + .45) * hd); g.closePath(); g.fill(); },
  glow(g, x, y, r, rgb, a){ const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); },
  lerp: (a, b, f) => a + (b - a) * f, clamp: (v, a, b) => Math.max(a, Math.min(b, v)), ease: f => f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2,
  rng(seed){ let s = seed || 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
};
