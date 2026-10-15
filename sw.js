/* 중·고 과학 실험실 · 서비스 워커 (앱 설치 + 오프라인)
   - 우리 사이트 파일: 인터넷이 되면 항상 최신 파일을 받고(받은 것은 저장), 끊겼을 때만 저장본을 씁니다.
     그래서 GitHub에 자료를 올리면 앱에도 바로 반영됩니다. 이 파일을 고칠 필요가 없습니다.
   - 글꼴·QR 라이브러리 같은 외부 파일: 저장본을 먼저 쓰고 뒤에서 새로 받아 둡니다. */
const CACHE = 'science-v1';
const CORE = [
  './', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png',
  'assets/site.css', 'assets/catalog.js', 'assets/simkit.js', 'assets/app.css', 'assets/app.js',
  'assets/deck.css', 'assets/deck.js', 'assets/worksheet.css', 'assets/worksheet.js',
  'assets/hskit.js', 'assets/circuit.js', 'assets/quizbank.js', 'assets/quizbank-hs.js', 'quiz/bell.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!url.protocol.startsWith('http')) return;

  if (url.origin === location.origin) {
    // 최신 우선, 끊기면 저장본
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(async () => (await caches.match(req))
        || (await caches.match(req, {ignoreSearch: true}))
        || (req.mode === 'navigate' ? await caches.match('index.html') : Response.error()))
    );
  } else {
    // 외부 파일(글꼴, CDN): 저장본 먼저, 뒤에서 갱신
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit || Response.error());
      return hit || net;
    }));
  }
});
