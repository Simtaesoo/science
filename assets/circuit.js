/* 격자 회로 풀이기 (마디 해석법)
   Circuit.solve(nNodes, parts) — parts: [{a, b, R}] 저항(전선·전구 포함), [{a, b, E, r}] 전지(a가 + 극)
   반환: {V: 마디 전위 배열, I: 각 부품 전류(a→b 방향, 전지는 내부에서 −→+ 방향으로 흐르는 전류)} */
window.Circuit = {
  solve(n, parts){
    const bat = parts.find(p => p.E != null), gnd = bat ? bat.b : 0, G = Array.from({length: n}, () => new Float64Array(n + 1));
    const stamp = (a, b, g) => { G[a][a] += g; G[b][b] += g; G[a][b] -= g; G[b][a] -= g; };
    parts.forEach(p => { if (p.E != null) { const g = 1 / p.r; stamp(p.a, p.b, g); G[p.a][n] += p.E * g; G[p.b][n] -= p.E * g; } else stamp(p.a, p.b, 1 / p.R); });
    for (let i = 0; i < n; i++) G[i][i] += 1e-9;
    // 접지 마디 고정
    for (let j = 0; j <= n; j++) G[gnd][j] = 0; G[gnd][gnd] = 1;
    // 가우스 소거
    for (let c = 0; c < n; c++) { let piv = c; for (let r = c + 1; r < n; r++) if (Math.abs(G[r][c]) > Math.abs(G[piv][c])) piv = r; [G[c], G[piv]] = [G[piv], G[c]]; const d = G[c][c]; if (Math.abs(d) < 1e-15) continue;
      for (let r = 0; r < n; r++) if (r !== c) { const f = G[r][c] / d; if (f) for (let k = c; k <= n; k++) G[r][k] -= f * G[c][k]; } }
    const V = Array.from({length: n}, (_, i) => Math.abs(G[i][i]) > 1e-15 ? G[i][n] / G[i][i] : 0);
    const I = parts.map(p => p.E != null ? (p.E - (V[p.a] - V[p.b])) / p.r : (V[p.a] - V[p.b]) / p.R);
    return {V, I};
  }
};
