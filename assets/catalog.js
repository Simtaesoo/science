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
    {kind:'sim', title:'3차시 지속가능한 삶 (탄소 발자국)', href:'g1/sustain/sim.html#carbon'}, {kind:'app', title:'게임: 탄소 제로 마을 (지속가능한 삶 정책 결정)', href:'g1/sustain/app-village.html'}, {kind:'ws', title:'학습지 1~3차시 (6쪽)', href:'g1/sustain/worksheet.html'} ]},
  { no:2, area:'bio', title:'생물의 구성과 다양성', code:'9과02', items:[
    {kind:'sim', title:'1차시 세포의 구조와 기능', href:'g1/life/sim.html#cell'}, {kind:'sim', title:'2차시 생물의 구성 단계', href:'g1/life/sim.html#level'},
    {kind:'sim', title:'3차시 변이와 생물다양성', href:'g1/life/sim.html#vary'}, {kind:'sim', title:'4차시 종의 개념과 5계 분류', href:'g1/life/sim.html#classify'},
    {kind:'sim', title:'5차시 생물다양성 보전', href:'g1/life/sim.html#protect'}, {kind:'app', title:'게임: 분류 탐정 (분류 열쇠로 5계 분류)', href:'g1/life/app-key.html'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g1/life/worksheet.html'} ]},
  { no:3, area:'phy', title:'열', code:'9과03', items:[
    {kind:'sim', title:'1차시 온도와 열평형', href:'g1/heat/sim.html#eq'}, {kind:'sim', title:'2차시 열의 이동 (전도·대류·복사)', href:'g1/heat/sim.html#move'},
    {kind:'sim', title:'3차시 비열과 열팽창', href:'g1/heat/sim.html#cap'}, {kind:'app', title:'게임: 단열 하우스 설계 (전도·대류·복사)', href:'g1/heat/app-house.html'}, {kind:'ws', title:'학습지 1~3차시 (6쪽)', href:'g1/heat/worksheet.html'} ]},
  { no:4, area:'chem', title:'물질의 상태 변화', code:'9과04', items:[
    {kind:'sim', title:'1차시 확산과 증발', href:'g1/state/sim.html#diff'}, {kind:'sim', title:'2차시 세 가지 상태와 상태 변화', href:'g1/state/sim.html#states'},
    {kind:'sim', title:'3차시 상태 변화와 열에너지 (가열·냉각 곡선)', href:'g1/state/sim.html#curve'}, {kind:'app', title:'게임: 상태 변화 분류 러시', href:'g1/state/app-rush.html'}, {kind:'ws', title:'학습지 1~3차시 (6쪽)', href:'g1/state/worksheet.html'} ]},
  { no:5, area:'phy', title:'힘의 작용', code:'9과05', items:[
    {kind:'sim', title:'1차시 힘의 표현과 힘의 평형', href:'g1/force/sim.html#bal'}, {kind:'sim', title:'2~3차시 중력·탄성력·마찰력·부력', href:'g1/force/sim.html#kinds'},
    {kind:'sim', title:'4차시 알짜힘과 운동 상태의 변화', href:'g1/force/sim.html#net'}, {kind:'sim', title:'5차시 힘의 평형과 장치 설계 (잠수정)', href:'g1/force/sim.html#design'},
    {kind:'app', title:'게임: 알짜힘 골프 (마찰력)', href:'g1/force/app-golf.html'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g1/force/worksheet.html'} ]},
  { no:6, area:'chem', title:'기체의 성질', code:'9과06', items:[
    {kind:'sim', title:'1차시 압력과 기체의 압력', href:'g1/gas/sim.html#p'}, {kind:'sim', title:'2차시 압력과 부피의 관계', href:'g1/gas/sim.html#pv'},
    {kind:'sim', title:'3차시 온도와 부피의 관계', href:'g1/gas/sim.html#tv'}, {kind:'app', title:'게임: 풍선 동굴 탐험 (온도·압력과 부피)', href:'g1/gas/app-balloon.html'}, {kind:'ws', title:'학습지 1~3차시 (6쪽)', href:'g1/gas/worksheet.html'} ]},
  { no:7, area:'earth', title:'태양계', code:'9과07', items:[
    {kind:'sim', title:'1차시 태양계 천체와 행성의 분류', href:'g1/solar/sim.html#planets'}, {kind:'sim', title:'2차시 태양 활동과 지구', href:'g1/solar/sim.html#sun'},
    {kind:'sim', title:'3차시 지구의 자전과 공전 (일주·연주 운동)', href:'g1/solar/sim.html#rot'}, {kind:'sim', title:'4차시 달의 위상과 일식·월식', href:'g1/solar/sim.html#moon'},
    {kind:'app', title:'게임: 달 모양 탐정 (달의 위상)', href:'g1/solar/app-moon.html'}, {kind:'ws', title:'학습지 1~4차시 (8쪽)', href:'g1/solar/worksheet.html'} ]}
 ]},
 { id:'g2', grade:'2학년', book:'과학 2', units:[
  { no:8, area:'chem', title:'물질의 특성', code:'9과08', items:[
    {kind:'sim', title:'1차시 물질의 특성과 밀도', href:'g2/matter/sim.html#dens'}, {kind:'sim', title:'2차시 용해도', href:'g2/matter/sim.html#sol'},
    {kind:'sim', title:'3차시 녹는점과 끓는점', href:'g2/matter/sim.html#mp'}, {kind:'sim', title:'4차시 순물질과 혼합물', href:'g2/matter/sim.html#mix'},
    {kind:'sim', title:'5차시 혼합물의 분리', href:'g2/matter/sim.html#sep'}, {kind:'app', title:'가상 실험: 미지 물질 탐정 (밀도·녹는점·끓는점·용해성)', href:'g2/matter/app-detective.html'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g2/matter/worksheet.html'} ]},
  { no:9, area:'earth', title:'지권의 변화', code:'9과09', items:[
    {kind:'sim', title:'1차시 지구계와 지권의 층상 구조', href:'g2/earth/sim.html#layer'}, {kind:'sim', title:'2차시 광물의 특성과 활용', href:'g2/earth/sim.html#mineral'},
    {kind:'sim', title:'3차시 암석의 분류와 순환', href:'g2/earth/sim.html#rock'}, {kind:'sim', title:'4차시 풍화 작용과 토양', href:'g2/earth/sim.html#weather'},
    {kind:'sim', title:'5차시 대륙 이동과 판의 경계', href:'g2/earth/sim.html#plate'}, {kind:'app', title:'게임: 광물 감정소 (조흔색·굳기·염산·자성)', href:'g2/earth/app-mineral.html'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g2/earth/worksheet.html'} ]},
  { no:10, area:'phy', title:'빛과 파동', code:'9과10', items:[
    {kind:'sim', title:'1차시 빛의 반사와 굴절', href:'g2/light/sim.html#refl'}, {kind:'sim', title:'2차시 거울과 렌즈에 의한 상', href:'g2/light/sim.html#image'},
    {kind:'sim', title:'3차시 빛의 합성과 물체의 색', href:'g2/light/sim.html#color'}, {kind:'sim', title:'4차시 파동과 소리 (소리 듣기)', href:'g2/light/sim.html#wave'},
    {kind:'app', title:'게임: 레이저 반사 퍼즐 (1~4모둠)', href:'g2/light/app-laser.html'}, {kind:'ws', title:'학습지 1~4차시 (8쪽)', href:'g2/light/worksheet.html'} ]},
  { no:11, area:'chem', title:'물질의 구성', code:'9과11', items:[
    {kind:'sim', title:'1차시 원소와 화합물 (분자 만들기·물의 전기 분해)', href:'g2/atom/sim.html#comp'}, {kind:'sim', title:'2차시 원자의 구조', href:'g2/atom/sim.html#atom'},
    {kind:'sim', title:'3차시 주기율표와 성질이 비슷한 원소', href:'g2/atom/sim.html#table'}, {kind:'sim', title:'4차시 원자·분자·이온', href:'g2/atom/sim.html#ion'},
    {kind:'app', title:'게임: 분자 공방 (화학식·분자 모형·이온 만들기)', href:'g2/atom/app-molecule.html'}, {kind:'ws', title:'학습지 1~4차시 (8쪽)', href:'g2/atom/worksheet.html'} ]},
  { no:12, area:'bio', title:'식물과 에너지', code:'9과12', items:[
    {kind:'sim', title:'1차시 광합성과 환경 요인 (실험 설계)', href:'g2/plant/sim.html#photo'}, {kind:'sim', title:'2차시 광합성과 호흡 (BTB 실험)', href:'g2/plant/sim.html#resp'},
    {kind:'sim', title:'3차시 광합성 산물의 저장과 이용', href:'g2/plant/sim.html#store'}, {kind:'app', title:'가상 실험: 광합성 산물 확인하기', href:'g2/plant/app-starch.html'}, {kind:'ws', title:'학습지 1~3차시 (6쪽)', href:'g2/plant/worksheet.html'} ]},
  { no:13, area:'bio', title:'동물과 에너지', code:'9과13', items:[{kind:'sim', title:'1차시 소화 · 소화 효소와 흡수', href:'g2/body/sim.html#dig'}, {kind:'sim', title:'2차시 순환 · 온몸 순환과 폐순환', href:'g2/body/sim.html#circ'}, {kind:'sim', title:'3차시 호흡 · 호흡 운동 모형', href:'g2/body/sim.html#breath'}, {kind:'sim', title:'4차시 배설 · 오줌의 생성', href:'g2/body/sim.html#excr'}, {kind:'sim', title:'5차시 세포 호흡과 기관계의 통합', href:'g2/body/sim.html#all'}, {kind:'app', title:'게임: 인체 택배 (소화·순환·호흡·배설 경로)', href:'g2/body/app-delivery.html'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g2/body/worksheet.html'}]},
  { no:14, area:'phy', title:'전기와 자기', code:'9과14', items:[{kind:'sim', title:'1차시 마찰 전기와 정전기 유도', href:'g2/elec/sim.html#static'}, {kind:'sim', title:'2차시 전압·전류·저항 (옴의 법칙)', href:'g2/elec/sim.html#ohm'}, {kind:'sim', title:'3차시 직렬·병렬연결과 소비 전력', href:'g2/elec/sim.html#circuit'}, {kind:'sim', title:'4차시 전류가 만드는 자기장', href:'g2/elec/sim.html#field'}, {kind:'sim', title:'4차시 자기장 속 전류와 전동기', href:'g2/elec/sim.html#motor'}, {kind:'app', title:'게임: 회로 퍼즐 (직렬·병렬, 옴의 법칙)', href:'g2/elec/app-circuit.html'}, {kind:'ws', title:'학습지 1~4차시 (8쪽)', href:'g2/elec/worksheet.html'}]},
  { no:15, area:'earth', title:'별과 우주', code:'9과15', items:[{kind:'sim', title:'1차시 연주 시차와 별까지의 거리', href:'g2/space/sim.html#parallax'}, {kind:'sim', title:'2차시 별의 밝기·등급, 색과 표면 온도', href:'g2/space/sim.html#mag'}, {kind:'sim', title:'3차시 우리은하와 성운·성단', href:'g2/space/sim.html#galaxy'}, {kind:'sim', title:'4차시 팽창하는 우주 (풍선 모형)', href:'g2/space/sim.html#expand'}, {kind:'sim', title:'4차시 우주 탐사의 역사', href:'g2/space/sim.html#explore'}, {kind:'app', title:'게임: 별 탐정 관측소 (연주 시차·등급·색)', href:'g2/space/app-observatory.html'}, {kind:'ws', title:'학습지 1~4차시 (8쪽)', href:'g2/space/worksheet.html'}]}
 ]},
 { id:'g3', grade:'3학년', book:'과학 3', units:[
  { no:16, area:'chem', title:'화학 반응의 규칙성과 에너지 변화', code:'9과16', items:[{kind:'sim', title:'1차시 물리 변화와 화학 변화', href:'g3/react/sim.html#change'}, {kind:'sim', title:'2차시 화학 반응식', href:'g3/react/sim.html#eq'}, {kind:'sim', title:'3차시 질량 보존 법칙', href:'g3/react/sim.html#mass'}, {kind:'sim', title:'4차시 일정 성분비 법칙', href:'g3/react/sim.html#ratio'}, {kind:'sim', title:'5차시 화학 반응에서의 에너지 출입', href:'g3/react/sim.html#energy'}, {kind:'app', title:'게임: 반응식 밸런스 (계수 맞추기·질량 보존)', href:'g3/react/app-balance.html'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g3/react/worksheet.html'}]},
  { no:17, area:'earth', title:'날씨와 기후변화', code:'9과17', items:[{kind:'sim', title:'1차시 기권의 층상 구조', href:'g3/weather/sim.html#layer'}, {kind:'sim', title:'2차시 복사 평형·온실 효과·지구 온난화', href:'g3/weather/sim.html#green'}, {kind:'sim', title:'3차시 포화 수증기량과 상대 습도', href:'g3/weather/sim.html#humid'}, {kind:'sim', title:'4차시 구름의 생성 (단열 팽창)', href:'g3/weather/sim.html#cloud'}, {kind:'sim', title:'5차시 기압과 바람, 해륙풍', href:'g3/weather/sim.html#wind'}, {kind:'sim', title:'6차시 기단과 전선', href:'g3/weather/sim.html#front'}, {kind:'app', title:'게임: 일기 예보관 데뷔 (바람·전선·습도)', href:'g3/weather/app-forecast.html'}, {kind:'ws', title:'학습지 1~6차시 (12쪽)', href:'g3/weather/worksheet.html'}]},
  { no:18, area:'earth', title:'수권과 해수의 순환', code:'9과18', items:[{kind:'sim', title:'1차시 수권의 분포와 수자원', href:'g3/ocean/sim.html#water'}, {kind:'sim', title:'2차시 해수의 층상 구조', href:'g3/ocean/sim.html#layer'}, {kind:'sim', title:'3차시 염분과 염분비 일정 법칙', href:'g3/ocean/sim.html#salt'}, {kind:'sim', title:'4차시 우리나라 주변 해류', href:'g3/ocean/sim.html#current'}, {kind:'sim', title:'5차시 조석', href:'g3/ocean/sim.html#tide'}, {kind:'app', title:'게임: 조경 수역 어부 (해류·수온·염분)', href:'g3/ocean/app-fishing.html'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g3/ocean/worksheet.html'}]},
  { no:19, area:'phy', title:'운동과 에너지', code:'9과19', items:[{kind:'sim', title:'1차시 속력과 등속 운동', href:'g3/motion/sim.html#uniform'}, {kind:'sim', title:'2차시 자유 낙하 운동', href:'g3/motion/sim.html#fall'}, {kind:'sim', title:'3차시 일', href:'g3/motion/sim.html#work'}, {kind:'sim', title:'4차시 위치 에너지와 운동 에너지', href:'g3/motion/sim.html#energy'}, {kind:'sim', title:'5차시 역학적 에너지 전환과 보존', href:'g3/motion/sim.html#mech'}, {kind:'sim', title:'(덤) 롤러코스터 에너지 실험', href:'g3/energy/sim.html'}, {kind:'app', title:'게임: 롤러코스터 설계소 (역학적 에너지 보존)', href:'g3/motion/app-coaster.html'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g3/motion/worksheet.html'}]},
  { no:20, area:'bio', title:'자극과 반응', code:'9과20', items:[{kind:'sim', title:'1차시 눈의 구조와 조절 작용', href:'g3/stimulus/sim.html#eye'}, {kind:'sim', title:'2차시 귀·코·혀·피부', href:'g3/stimulus/sim.html#sense'}, {kind:'sim', title:'3차시 뉴런과 신경계', href:'g3/stimulus/sim.html#nerve'}, {kind:'sim', title:'4차시 반응 시간 측정·무조건 반사', href:'g3/stimulus/sim.html#react'}, {kind:'sim', title:'5차시 호르몬과 항상성', href:'g3/stimulus/sim.html#homeo'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g3/stimulus/worksheet.html'}]},
  { no:21, area:'bio', title:'생식과 유전', code:'9과21', items:[{kind:'sim', title:'1차시 세포 분열의 필요성과 염색체', href:'g3/genetics/sim.html#size'}, {kind:'sim', title:'2차시 체세포 분열', href:'g3/genetics/sim.html#mitosis'}, {kind:'sim', title:'3차시 감수 분열', href:'g3/genetics/sim.html#meiosis'}, {kind:'sim', title:'4차시 사람의 발생', href:'g3/genetics/sim.html#develop'}, {kind:'sim', title:'5차시 멘델의 유전 원리', href:'g3/genetics/sim.html#mendel'}, {kind:'sim', title:'6차시 사람의 유전 (혈액형·색맹·가계도)', href:'g3/genetics/sim.html#human'}, {kind:'sim', title:'(덤) 멘델의 유전 실험실', href:'g3/heredity/sim.html'}, {kind:'ws', title:'학습지 1~6차시 (12쪽)', href:'g3/genetics/worksheet.html'}]},
  { no:22, area:'gen', title:'재해·재난과 안전', code:'9과22', items:[{kind:'sim', title:'1차시 재해·재난의 종류와 특징', href:'g3/safety/sim.html#types'}, {kind:'sim', title:'2차시 지진 (P파·S파, 내진 설계)', href:'g3/safety/sim.html#quake'}, {kind:'sim', title:'3차시 태풍과 위험 반원', href:'g3/safety/sim.html#storm'}, {kind:'sim', title:'4차시 감염병 확산 모형', href:'g3/safety/sim.html#epi'}, {kind:'sim', title:'5차시 화학 사고 대피와 화재 안전', href:'g3/safety/sim.html#chem'}, {kind:'ws', title:'학습지 1~5차시 (10쪽)', href:'g3/safety/worksheet.html'}]},
  { no:23, area:'gen', title:'과학과 나의 미래', code:'9과23', items:[{kind:'sim', title:'1차시 과학기술과 미래 사회', href:'g3/future/sim.html#tech'}, {kind:'sim', title:'2차시 과학 관련 직업 탐색', href:'g3/future/sim.html#jobs'}, {kind:'sim', title:'3차시 나의 진로 설계', href:'g3/future/sim.html#plan'}, {kind:'ws', title:'학습지 1~3차시 (6쪽)', href:'g3/future/worksheet.html'}]}
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
