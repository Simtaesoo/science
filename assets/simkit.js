/* 시뮬레이션 공통 도구: 캔버스 크기 맞추기, 테마 색, 그래프 축, 탭 전환, 반복 실행 */
window.Kit = (() => {
  const C = {};
  const TOKENS = ['surface','ink','muted','line','soft','grid','phy','chem','bio','earth','gen','hot','cold','warn','accent'];
  function colors(){ const cs = getComputedStyle(document.documentElement); TOKENS.forEach(k => C[k] = cs.getPropertyValue('--' + k).trim()); return C; }
  const family = () => getComputedStyle(document.body).fontFamily;
  const font = (s, w) => `${w || 400} ${s}px ${family()}`;

  // 캔버스를 부모 상자 크기와 화면 배율에 맞추고, 크기가 바뀌면 다시 맞춘다
  function canvas(cv){
    const o = {cv, g: cv.getContext('2d'), w: 0, h: 0};
    const fit = () => { const r = cv.parentElement.getBoundingClientRect(), d = devicePixelRatio || 1;
      cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); o.g.setTransform(d, 0, 0, d, 0, 0); o.w = r.width; o.h = r.height; };
    new ResizeObserver(fit).observe(cv.parentElement); fit(); return o;
  }

  // 온도 → 색 (차가움 파랑, 뜨거움 빨강). 두 테마 모두에서 읽히도록 채도·명도 고정
  function tempColor(t, lo, hi){ const f = Math.max(0, Math.min(1, (t - lo) / (hi - lo))); return `hsl(${215 - 215 * f} 78% 55%)`; }

  // 그래프 축: ax = {x:[min,max,step,'이름'], y:[...]} → 좌표 변환 함수
  function axes(cvo, ax, pad){
    const g = cvo.g, P = Object.assign({L: 48, R: 14, T: 12, B: 32}, pad || {});
    const w = cvo.w - P.L - P.R, h = cvo.h - P.T - P.B;
    const [x0, x1, xs, xl] = ax.x, [y0, y1, ys, yl] = ax.y;
    const X = v => P.L + (v - x0) / (x1 - x0) * w, Y = v => P.T + h - (v - y0) / (y1 - y0) * h;
    g.fillStyle = C.surface; g.fillRect(0, 0, cvo.w, cvo.h);
    g.font = font(11); g.lineWidth = 1;
    g.textAlign = 'right'; g.textBaseline = 'middle';
    for (let v = y0; v <= y1 + 1e-9; v += ys) { g.strokeStyle = C.grid; g.beginPath(); g.moveTo(P.L, Y(v) + .5); g.lineTo(P.L + w, Y(v) + .5); g.stroke(); g.fillStyle = C.muted; g.fillText(+v.toFixed(2), P.L - 6, Y(v)); }
    g.textAlign = 'center'; g.textBaseline = 'top';
    for (let v = x0; v <= x1 + 1e-9; v += xs) g.fillText(+v.toFixed(2), X(v), P.T + h + 5);
    if (xl) g.fillText(xl, P.L + w / 2, cvo.h - 13);
    if (yl) { g.save(); g.translate(11, P.T + h / 2); g.rotate(-Math.PI / 2); g.textBaseline = 'middle'; g.fillText(yl, 0, 0); g.restore(); }
    g.strokeStyle = C.line; g.beginPath(); g.moveTo(P.L, P.T); g.lineTo(P.L, P.T + h); g.lineTo(P.L + w, P.T + h); g.stroke();
    return {X, Y, L: P.L, T: P.T, w, h};
  }
  function line(cvo, pts, m, color, width, dash){
    if (pts.length < 2) return; const g = cvo.g;
    g.strokeStyle = color; g.lineWidth = width || 2.5; g.setLineDash(dash || []);
    g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(m.X(p[0]), m.Y(p[1])) : g.moveTo(m.X(p[0]), m.Y(p[1]))); g.stroke(); g.setLineDash([]);
  }
  function arrow(g, x0, y0, x1, y1, color, width){
    const a = Math.atan2(y1 - y0, x1 - x0), hl = Math.max(7, (width || 2) * 3);
    g.strokeStyle = color; g.fillStyle = color; g.lineWidth = width || 2;
    g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1 - Math.cos(a) * hl * .6, y1 - Math.sin(a) * hl * .6); g.stroke();
    g.beginPath(); g.moveTo(x1, y1); g.lineTo(x1 - Math.cos(a - .45) * hl, y1 - Math.sin(a - .45) * hl); g.lineTo(x1 - Math.cos(a + .45) * hl, y1 - Math.sin(a + .45) * hl); g.closePath(); g.fill();
  }
  function label(g, text, x, y, opt){
    opt = opt || {}; g.font = font(opt.size || 12, opt.weight); g.fillStyle = opt.color || C.ink;
    g.textAlign = opt.align || 'center'; g.textBaseline = opt.base || 'middle'; g.fillText(text, x, y);
  }

  // 탭: 버튼[data-mode] 묶음. 주소 #모드로 바로 열 수 있다
  function tabs(onSet, modes){
    const btns = [...document.querySelectorAll('[data-mode]')];
    const set = m => {
      btns.forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === m));
      document.querySelectorAll('[data-only]').forEach(el => el.hidden = !el.dataset.only.split(' ').includes(m));
      try { history.replaceState(null, '', '#' + m); } catch (e) {}
      onSet(m);
    };
    btns.forEach(b => b.onclick = () => set(b.dataset.mode));
    const want = (location.hash || '').slice(1);
    set(modes.includes(want) ? want : modes[0]);
    return set;
  }
  // 버튼 묶음 하나(seg)에서 값 고르기
  function seg(el, attr, onSet){
    const bs = [...el.querySelectorAll(`[data-${attr}]`)];
    const set = v => { bs.forEach(b => b.setAttribute('aria-pressed', b.dataset[attr] === String(v))); onSet(v); };
    bs.forEach(b => b.onclick = () => set(b.dataset[attr]));
    return set;
  }

  // 반복 실행: step(dt)는 재생 중에만, draw()는 항상
  function loop(step, draw, playBtn){
    const st = {run: !matchMedia('(prefers-reduced-motion: reduce)').matches};
    const upd = () => { if (playBtn) playBtn.textContent = st.run ? '일시정지' : '재생'; };
    if (playBtn) playBtn.onclick = () => { st.run = !st.run; upd(); };
    upd();
    let last = performance.now();
    const f = now => { const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)); last = now; colors(); if (st.run) step(dt); draw(); requestAnimationFrame(f); };
    colors(); requestAnimationFrame(f);
    return st;
  }
  const $ = id => document.getElementById(id);
  return {C, colors, font, canvas, tempColor, axes, line, arrow, label, tabs, seg, loop, $};
})();
