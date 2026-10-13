/* 학습지 공통 동작: 정답 보기, 인쇄, 시뮬레이션 QR 코드 */
window.addEventListener('DOMContentLoaded', () => {
  const ansBtn = document.querySelector('[data-ans]');
  if (ansBtn) ansBtn.onclick = () => {
    const on = document.body.classList.toggle('show-ans');
    ansBtn.classList.toggle('on', on);
    ansBtn.textContent = on ? '정답 숨기기' : '정답 보기';
  };
  const pr = document.querySelector('[data-print]');
  if (pr) pr.onclick = () => window.print();

  // 쪽 번호
  const sheets = document.querySelectorAll('.sheet');
  sheets.forEach((s, i) => { const n = s.querySelector('[data-page]'); if (n) n.textContent = `${i + 1} / ${sheets.length}`; });

  // 그래프 칸: data-x="최소,최대,간격,이름" data-y="..." data-ans="x:y x:y" (정답 점, 정답 보기에서만 보임)
  document.querySelectorAll('svg[data-graph]').forEach(svg => {
    const [x0, x1, xs, xl] = svg.dataset.x.split(','), [y0, y1, ys, yl] = svg.dataset.y.split(',');
    const W = 300, H = 190, L = 40, R = 10, T = 10, B = 34, w = W - L - R, h = H - T - B;
    const X = v => L + (v - x0) / (x1 - x0) * w, Y = v => T + h - (v - y0) / (y1 - y0) * h;
    let s = `<g stroke="#c9d2da" stroke-width=".6">`;
    const fx = (+xs) / 2, fy = (+ys) / 2;
    for (let v = +x0; v <= +x1 + 1e-9; v += fx) s += `<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${T + h}" ${Math.abs((v - x0) % xs) > 1e-9 ? 'stroke-dasharray="1.5 2"' : ''}/>`;
    for (let v = +y0; v <= +y1 + 1e-9; v += fy) s += `<line x1="${L}" y1="${Y(v)}" x2="${L + w}" y2="${Y(v)}" ${Math.abs((v - y0) % ys) > 1e-9 ? 'stroke-dasharray="1.5 2"' : ''}/>`;
    s += `</g><g stroke="#16202a" stroke-width="1"><line x1="${L}" y1="${T}" x2="${L}" y2="${T + h}"/><line x1="${L}" y1="${T + h}" x2="${L + w}" y2="${T + h}"/></g>`;
    s += `<g font-size="9" fill="#5d6975" font-family="IBM Plex Mono, monospace">`;
    for (let v = +x0; v <= +x1 + 1e-9; v += +xs) s += `<text x="${X(v)}" y="${T + h + 12}" text-anchor="middle">${+v.toFixed(2)}</text>`;
    for (let v = +y0; v <= +y1 + 1e-9; v += +ys) s += `<text x="${L - 5}" y="${Y(v) + 3}" text-anchor="end">${+v.toFixed(2)}</text>`;
    s += `</g><g font-size="9.5" fill="#16202a"><text x="${L + w / 2}" y="${H - 4}" text-anchor="middle">${xl}</text>` +
         `<text transform="translate(10 ${T + h / 2}) rotate(-90)" text-anchor="middle">${yl}</text></g>`;
    if (svg.dataset.ans) {
      const pts = svg.dataset.ans.trim().split(/\s+/).map(p => p.split(':').map(Number));
      s += `<g class="ans-svg"><polyline fill="none" stroke="#d2412f" stroke-width="1.6" points="${pts.map(p => X(p[0]) + ',' + Y(p[1])).join(' ')}"/>` +
           pts.map(p => `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="3" fill="#d2412f"/>`).join('') + '</g>';
    }
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.innerHTML = s;
  });

  // 입자 모형 상자: data-box="입자 수,기체 높이(0~1),피스톤 1/0,추 개수,씨앗,모양" 모양: gas|liquid|solid|empty
  document.querySelectorAll('svg[data-box]').forEach(svg => {
    const [n, hf, piston, wts, seed, kind] = svg.dataset.box.split(',');
    let r = +seed || 1; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    const W = 120, H = 130, x0 = 20, x1 = 100, yb = 122, top = yb - (+hf) * 100;
    let s = `<rect x="${x0}" y="${top}" width="${x1 - x0}" height="${yb - top}" fill="#f2f5f8"/>`;
    s += `<path d="M${x0} 18 V${yb} H${x1} V18" fill="none" stroke="#16202a" stroke-width="2"/>`;
    if (+piston) {
      s += `<rect x="${x0 + 1}" y="${top - 6}" width="${x1 - x0 - 2}" height="6" fill="#16202a"/>`;
      for (let i = 0; i < +wts; i++) s += `<rect x="${(x0 + x1) / 2 - 16}" y="${top - 6 - (i + 1) * 9}" width="32" height="8" fill="#8a96a3"/>`;
    }
    const pts = [];
    if (kind === 'solid') {
      const cols = 6; for (let i = 0; i < +n; i++) pts.push([x0 + 12 + (i % cols) * 11.5, yb - 7 - Math.floor(i / cols) * 11]);
    } else if (kind === 'liquid') {
      // 서로 겹치지 않게, 가깝지만 불규칙하게 배열
      const cols = 7, gap = 10.6;
      for (let i = 0; i < +n; i++) {
        const row = Math.floor(i / cols), col = i % cols;
        pts.push([x0 + 8 + col * gap + (row % 2) * 3 + (rnd() - .5) * 3.2, yb - 6 - row * 9.6 + (rnd() - .5) * 2.4]);
      }
    } else if (kind !== 'empty') {
      for (let i = 0; i < +n; i++) pts.push([x0 + 6 + rnd() * (x1 - x0 - 12), top + 6 + rnd() * (yb - top - 12)]);
    }
    s += pts.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4" fill="var(--area)"/>`).join('');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.innerHTML = s;
  });

  // QR: data-sim에 적힌 상대 경로를 지금 주소 기준 절대 주소로 바꿔서 그린다
  document.querySelectorAll('.simlink').forEach(box => {
    const url = new URL(box.dataset.sim, location.href).href;
    const u = box.querySelector('.url'); if (u) u.textContent = url;
    const q = box.querySelector('.qr');
    try {
      const qr = qrcode(0, 'M'); qr.addData(url); qr.make();
      q.innerHTML = qr.createSvgTag({ cellSize: 3, margin: 0, scalable: true });
    } catch (e) { q.hidden = true; }
  });
});
