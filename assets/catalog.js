/* 사이트 전체 목차. 새 자료를 만들면 href를 채우면 메인 화면에 '바로 열기'로 바뀝니다.
   area: phy(물리) chem(화학) bio(생명) earth(지구) gen(통합) */
window.SITE = {
  name: '중학 과학 실험실',
  author: '',            // 예: '○○중 홍길동' — 채우면 모든 페이지 아래에 표시됩니다
  curriculum: '2022 개정 교육과정'
};

window.CATALOG = [
 { id:'g1', grade:'1학년', book:'과학 1', units:[
  { no:1, area:'gen', title:'과학과 인류의 지속가능한 삶', code:'9과01', items:[
    {kind:'sim', title:'1차시 과학적 탐구 방법 (변인 통제)', href:'g1/sustain/sim.html#inq'}, {kind:'sim', title:'2차시 과학기술과 미래 사회 (인공지능 체험)', href:'g1/sustain/sim.html#future'},
    {kind:'sim', title:'3차시 지속가능한 삶 (탄소 발자국)', href:'g1/sustain/sim.html#carbon'}, {kind:'ws', title:'학습지 1~3차시 (6쪽)', href:'g1/sustain/worksheet.html'} ]},
  { no:2, area:'bio', title:'생물의 구성과 다양성', code:'9과02', items:[
    {kind:'sim', title:'1차시 세포의 구조와 기능', href:'g1/life/sim.html#cell'}, {kind:'sim', title:'2차시 생물의 구성 단계', href:'g1/life/sim.html#level'},
    {kind:'sim', title:'3차시 변이와 생물다양성', href:'g1/life/sim.html#vary'}, {kind:'sim', title:'4차시 종의 개념과 5계 분류', href:'g1/life/sim.html#classify'},
    {kind:'sim', title:'5차시 생물다양성 보전', href:'g1/life/sim.html#protect'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g1/life/worksheet.html'} ]},
  { no:3, area:'phy', title:'열', code:'9과03', items:[
    {kind:'sim', title:'1차시 온도와 열평형', href:'g1/heat/sim.html#eq'}, {kind:'sim', title:'2차시 열의 이동 (전도·대류·복사)', href:'g1/heat/sim.html#move'},
    {kind:'sim', title:'3차시 비열과 열팽창', href:'g1/heat/sim.html#cap'}, {kind:'ws', title:'학습지 1~3차시 (6쪽)', href:'g1/heat/worksheet.html'} ]},
  { no:4, area:'chem', title:'물질의 상태 변화', code:'9과04', items:[
    {kind:'sim', title:'1차시 확산과 증발', href:'g1/state/sim.html#diff'}, {kind:'sim', title:'2차시 세 가지 상태와 상태 변화', href:'g1/state/sim.html#states'},
    {kind:'sim', title:'3차시 상태 변화와 열에너지 (가열·냉각 곡선)', href:'g1/state/sim.html#curve'}, {kind:'ws', title:'학습지 1~3차시 (6쪽)', href:'g1/state/worksheet.html'} ]},
  { no:5, area:'phy', title:'힘의 작용', code:'9과05', items:[
    {kind:'sim', title:'1차시 힘의 표현과 힘의 평형', href:'g1/force/sim.html#bal'}, {kind:'sim', title:'2~3차시 중력·탄성력·마찰력·부력', href:'g1/force/sim.html#kinds'},
    {kind:'sim', title:'4차시 알짜힘과 운동 상태의 변화', href:'g1/force/sim.html#net'}, {kind:'sim', title:'5차시 힘의 평형과 장치 설계 (잠수정)', href:'g1/force/sim.html#design'},
    {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g1/force/worksheet.html'} ]},
  { no:6, area:'chem', title:'기체의 성질', code:'9과06', items:[
    {kind:'sim', title:'1차시 압력과 기체의 압력', href:'g1/gas/sim.html#p'}, {kind:'sim', title:'2차시 압력과 부피의 관계', href:'g1/gas/sim.html#pv'},
    {kind:'sim', title:'3차시 온도와 부피의 관계', href:'g1/gas/sim.html#tv'}, {kind:'ws', title:'학습지 1~3차시 (6쪽)', href:'g1/gas/worksheet.html'} ]},
  { no:7, area:'earth', title:'태양계', code:'9과07', items:[
    {kind:'sim', title:'1차시 태양계 천체와 행성의 분류', href:'g1/solar/sim.html#planets'}, {kind:'sim', title:'2차시 태양 활동과 지구', href:'g1/solar/sim.html#sun'},
    {kind:'sim', title:'3차시 지구의 자전과 공전 (일주·연주 운동)', href:'g1/solar/sim.html#rot'}, {kind:'sim', title:'4차시 달의 위상과 일식·월식', href:'g1/solar/sim.html#moon'},
    {kind:'ws', title:'학습지 1~4차시 (8쪽)', href:'g1/solar/worksheet.html'} ]}
 ]},
 { id:'g2', grade:'2학년', book:'과학 2', units:[
  { no:8, area:'chem', title:'물질의 특성', code:'9과08', items:[
    {kind:'sim', title:'1차시 물질의 특성과 밀도', href:'g2/matter/sim.html#dens'}, {kind:'sim', title:'2차시 용해도', href:'g2/matter/sim.html#sol'},
    {kind:'sim', title:'3차시 녹는점과 끓는점', href:'g2/matter/sim.html#mp'}, {kind:'sim', title:'4차시 순물질과 혼합물', href:'g2/matter/sim.html#mix'},
    {kind:'sim', title:'5차시 혼합물의 분리', href:'g2/matter/sim.html#sep'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g2/matter/worksheet.html'} ]},
  { no:9, area:'earth', title:'지권의 변화', code:'9과09', items:[
    {kind:'sim', title:'1차시 지구계와 지권의 층상 구조', href:'g2/earth/sim.html#layer'}, {kind:'sim', title:'2차시 광물의 특성과 활용', href:'g2/earth/sim.html#mineral'},
    {kind:'sim', title:'3차시 암석의 분류와 순환', href:'g2/earth/sim.html#rock'}, {kind:'sim', title:'4차시 풍화 작용과 토양', href:'g2/earth/sim.html#weather'},
    {kind:'sim', title:'5차시 대륙 이동과 판의 경계', href:'g2/earth/sim.html#plate'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g2/earth/worksheet.html'} ]},
  { no:10, area:'phy', title:'빛과 파동', code:'9과10', items:[{kind:'sim', title:'거울과 렌즈의 상'}, {kind:'sim', title:'빛의 합성과 물체의 색'}, {kind:'sim', title:'소리의 진폭·진동수'}]},
  { no:11, area:'chem', title:'물질의 구성', code:'9과11', items:[{kind:'sim', title:'원자 모형과 이온 만들기'}]},
  { no:12, area:'bio', title:'식물과 에너지', code:'9과12', items:[{kind:'sim', title:'광합성에 영향을 주는 요인'}]},
  { no:13, area:'bio', title:'동물과 에너지', code:'9과13', items:[{kind:'sim', title:'소화·순환·호흡·배설 연결 지도'}]},
  { no:14, area:'phy', title:'전기와 자기', code:'9과14', items:[{kind:'sim', title:'전압·전류·저항 회로 실험'}, {kind:'sim', title:'전동기의 원리'}]},
  { no:15, area:'earth', title:'별과 우주', code:'9과15', items:[{kind:'sim', title:'연주 시차와 별의 거리'}, {kind:'sim', title:'팽창하는 우주 풍선 모형'}]}
 ]},
 { id:'g3', grade:'3학년', book:'과학 3', units:[
  { no:16, area:'chem', title:'화학 반응의 규칙성', code:'9과16', items:[{kind:'sim', title:'질량 보존과 일정 성분비'}]},
  { no:17, area:'earth', title:'날씨와 기후변화', code:'9과17', items:[{kind:'sim', title:'온실 효과 모형'}, {kind:'sim', title:'기단과 전선'}]},
  { no:18, area:'earth', title:'수권과 해수의 순환', code:'9과18', items:[{kind:'sim', title:'해수의 수온·염분 분포'}]},
  { no:19, area:'phy', title:'운동과 에너지', code:'9과19', items:[
    {kind:'sim', title:'역학적 에너지 전환과 보존', href:'g3/energy/sim.html'}, {kind:'sim', title:'자유 낙하 운동 그래프'} ]},
  { no:20, area:'bio', title:'자극과 반응', code:'9과20', items:[{kind:'sim', title:'반응 속도 측정 실험'}]},
  { no:21, area:'bio', title:'생식과 유전', code:'9과21', items:[
    {kind:'sim', title:'멘델의 유전 실험실', href:'g3/heredity/sim.html'}, {kind:'sim', title:'체세포 분열과 감수 분열'}, {kind:'sim', title:'가계도 분석'} ]},
  { no:22, area:'gen', title:'재해·재난과 안전', code:'9과22', items:[{kind:'sim', title:'재해 대응 시나리오'}]},
  { no:23, area:'gen', title:'과학과 나의 미래', code:'9과23', items:[{kind:'sim', title:'과학 관련 직업 탐색'}]}
 ]}
];

/* 하위 페이지 공통: 상단 이동 막대와 바닥글을 채운다 */
window.addEventListener('DOMContentLoaded', () => {
  const root = document.body.dataset.root || './';
  const bar = document.querySelector('[data-topbar]');
  if (bar) {
    const crumbs = (bar.dataset.topbar || '').split('|').filter(Boolean);
    bar.innerHTML = `<a class="brand" href="${root}index.html">${SITE.name}</a>` +
      crumbs.map(c => `<span class="sep">›</span><span>${c}</span>`).join('') +
      `<span class="spacer"></span>` + (bar.dataset.ws ? `<a class="btn" href="${bar.dataset.ws}">학습지</a>` : '') +
      (bar.dataset.sim ? `<a class="btn" href="${bar.dataset.sim}">시뮬레이션</a>` : '');
  }
  const ft = document.querySelector('[data-footer]');
  if (ft) ft.innerHTML = `${SITE.name} · ${SITE.curriculum} 기준${SITE.author ? ' · 제작 ' + SITE.author : ''}` + (ft.dataset.extra ? ' · ' + ft.dataset.extra : '');
});
