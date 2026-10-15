/* 고등학교 게임 공통 도구 (HS) — AppKit 위에서 단계(레벨) 진행, 슬라이더, 그래프 축을 돕는다.
   const k = HS(app, {levels: LV, load(L, i){ ... }});  app.onStart = () => { ...패널 만들기...; k.begin(); };
   k.win(box, why) / k.fail(msg) / k.slider(box, {label, min, max, step, val, fmt, on}) / k.draw(fn) / k.axes(g, box, xr, yr, xl, yl) */
window.HS = (app, o) => {
  const D = Draw;
  const k = {lv: 0, fails: 0, done: false};
  k.L = () => o.levels[k.lv];
  k.begin = () => { const q = +(new URLSearchParams(location.search).get('lv') || 1) - 1; k.lv = Math.max(0, Math.min(o.levels.length - 1, q || 0)); k.fails = 0; app.startTimer(); k.load(); }; // ?lv=3 → 3단계부터
  k.load = () => { k.done = false; app.setLevel(k.lv, o.levels.length); o.load(o.levels[k.lv], k.lv); };
  k.fail = msg => { if (k.done) return; k.fails++; app.sfx.bad(); app.addScore(-10); app.toast(msg, 'bad'); };
  k.win = (box, why, extra) => {
    if (k.done) return; k.done = true; app.sfx.win(); app.confetti(90);
    const pts = 150 - Math.min(100, k.fails * 15); k.fails = 0; app.addScore(pts);
    const d = document.createElement('div');
    d.innerHTML = `<p style="color:var(--mint);font-weight:700;margin-top:8px">✔ 성공! +${pts}${extra ? ' · ' + extra : ''}</p>${why ? `<p class="note-c" style="margin-top:4px">${why}</p>` : ''}<button class="big" type="button" style="width:100%;margin-top:8px">${k.lv + 1 < o.levels.length ? '다음 단계 ▶' : '결과 보기'}</button>`;
    box.appendChild(d);
    d.querySelector('button').onclick = () => { app.sfx.click(); k.lv++;
      if (k.lv >= o.levels.length) { const n = o.levels.length, sc = app.player.score;
        return app.finish({stars: sc >= n * 130 ? 3 : sc >= n * 90 ? 2 : 1, summary: `${n}단계 완주! 점수 <b>${sc}</b>`, best: sc + '점', bestValue: sc}); }
      k.load(); };
  };
  k.mission = (box, html) => { box.innerHTML = `<p><b>${k.lv + 1}단계</b></p><p class="mission">${html}</p>`; };
  k.slider = (box, s) => {
    const w = document.createElement('label'); w.className = 'range'; w.style.margin = '8px 0';
    w.innerHTML = `<span style="min-width:74px;font-size:14px">${s.label}</span><input type="range" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.val}" style="min-width:70px"><output style="white-space:nowrap;font-size:15.5px"></output>`;
    const inp = w.querySelector('input'), out = w.querySelector('output');
    const upd = quiet => { out.textContent = s.fmt ? s.fmt(+inp.value) : inp.value; if (!quiet && s.on) s.on(+inp.value); };
    inp.oninput = () => upd(); box.appendChild(w); upd(true);
    return {get v(){ return +inp.value; }, set(v){ inp.value = v; upd(true); }, el: inp, wrap: w};
  };
  k.btn = (box, label, fn, cls) => { const b = document.createElement('button'); b.type = 'button'; b.className = cls || 'big'; b.style.width = '100%'; b.style.marginTop = '8px'; b.innerHTML = label; b.onclick = () => { app.sfx.click(); fn(b); }; box.appendChild(b); return b; };
  k.draw = fn => { app.draw = (g, W, H) => { if (W < 120 || H < 80 || !o.levels[k.lv]) return; fn(g, W, H); }; };
  // 그래프 축: box {x, y, w, h}, xr/yr [min, max, step]
  k.axes = (g, b, xr, yr, xl, yl, o2) => {
    o2 = o2 || {}; const X = v => b.x + (v - xr[0]) / (xr[1] - xr[0]) * b.w, Y = v => b.y + b.h - (v - yr[0]) / (yr[1] - yr[0]) * b.h;
    g.fillStyle = o2.bg || 'rgba(255,255,255,.6)'; g.fillRect(b.x, b.y, b.w, b.h);
    g.lineWidth = 1; g.font = '11px IBM Plex Sans KR, sans-serif';
    for (let v = xr[0]; v <= xr[1] + 1e-9; v += xr[2]) { g.strokeStyle = 'rgba(0,0,0,.08)'; g.beginPath(); g.moveTo(X(v), b.y); g.lineTo(X(v), b.y + b.h); g.stroke(); D.text(g, +v.toFixed(6) + '', X(v), b.y + b.h + 11, {size: 10.5, color: '#55606e'}); }
    for (let v = yr[0]; v <= yr[1] + 1e-9; v += yr[2]) { g.strokeStyle = 'rgba(0,0,0,.08)'; g.beginPath(); g.moveTo(b.x, Y(v)); g.lineTo(b.x + b.w, Y(v)); g.stroke(); D.text(g, +v.toFixed(6) + '', b.x - 5, Y(v), {size: 10.5, color: '#55606e', align: 'right'}); }
    g.strokeStyle = '#55606e'; g.strokeRect(b.x, b.y, b.w, b.h);
    if (xl) D.text(g, xl, b.x + b.w / 2, b.y + b.h + 26, {size: 11.5, color: '#34404e', weight: 700});
    if (yl) { g.save(); g.translate(b.x - 34, b.y + b.h / 2); g.rotate(-Math.PI / 2); D.text(g, yl, 0, 0, {size: 11.5, color: '#34404e', weight: 700}); g.restore(); }
    return {X, Y};
  };
  k.line = (g, pts, col, w, dash) => { g.strokeStyle = col; g.lineWidth = w || 2.5; g.setLineDash(dash || []); g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.stroke(); g.setLineDash([]); };
  return k;
};
