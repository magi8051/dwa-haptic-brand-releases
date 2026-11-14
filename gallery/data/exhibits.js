/* Haptic Design Lab Gallery — 전시 데이터 (단일 출처)
 * 새 데모기를 추가할 때는 EXHIBITS 배열 끝에 항목만 추가하면 됩니다.
 * photos: assets/photos/<id>/ 폴더 안의 파일명 목록 (비어 있으면 "PHOTO · 추가" 자리표시가 표시됨)
 * ic: 칩으로 표시할 드라이버 이름 목록
 * 고객사 실명은 넣지 않습니다 (산업·국가로 표기).
 */
window.WINGS = [
  { id: "auto", name: "Automotive", ko: "자동차" },
  { id: "building", name: "Building", ko: "빌딩·산업용" },
  { id: "pc", name: "PC · Gaming", ko: "PC·게이밍" },
  { id: "fitness", name: "Fitness", ko: "피트니스" },
  { id: "entertainment", name: "Entertainment", ko: "엔터·미디어" },
  { id: "wearable", name: "Wearable", ko: "웨어러블" },
  { id: "platform", name: "Platform", ko: "기술 플랫폼" }
];

window.EXHIBITS = [
  /* ---------- Automotive ---------- */
  {
    id: "hvac", wing: "auto", status: "done", featured: true,
    title: "HVAC 햅틱 컨트롤", feel: "같은 화면, 드라이버만 바꾼 두 가지 촉감: LRA와 Piezo.",
    ic: ["DW7917", "DW3M120"], photos: [],
    purpose: "차량 공조(HVAC) 조작부를 터치스크린으로 대체하면서도 프리미엄 차량의 물리 버튼 감성을 잃지 않기 위한 데모입니다.",
    specs: [["디스플레이", "7\" AMOLED 165Hz 터치"], ["메인보드", "Raspberry Pi 5"], ["햅틱 드라이버", "1단계 DW7917 (LRA) · 2단계 DW3M120 (Piezo)"], ["소프트웨어", "Electron GUI · .deb 배포"], ["UI 구성", "듀얼존 온도 다이얼 · 로터리 조그 · 좌석 통풍/열선"]],
    highlights: ["같은 GUI에서 드라이버 계층만 교체해 LRA와 Piezo 두 가지 촉감을 비교", "물리 버튼처럼 느껴지는 로터리 다이얼 클릭감", "듀얼존(운전석/동승석) 독립 온도 제어 UI"],
    deploy: "1단계(DW7917 LRA)와 2단계(DW3M120 Piezo) 제작을 모두 완료했고, .deb 패키지로 배포합니다. Piezo 구성은 piezo-update로 갱신합니다."
  },
  {
    id: "adas-pad", wing: "auto", status: "done",
    title: "ADAS Haptic PAD", feel: "8채널, 좌·우 경고 진동으로 방향을 전달합니다.",
    ic: ["8CH"], photos: [], client: "자동차 부품 제조사 · 일본",
    purpose: "일본 자동차 부품 제조사向으로, 주행 중 경고를 좌·우 방향으로 구분해 전달하는 햅틱 패드를 제작했습니다.",
    specs: [["채널", "8CH"], ["경고 방식", "좌/우 채널 경고 진동"]],
    highlights: ["8채널 구성으로 좌·우 방향 경고를 구분해 전달", "고객사 요청 사양에 맞춘 맞춤 제작"],
    deploy: "일본 자동차 부품 제조사向 데모로 제작을 완료했습니다."
  },
  {
    id: "tesla", wing: "auto", status: "done",
    title: "OHC 터치·햅틱 통합", feel: "터치한 자리에서 바로 돌아오는 응답.",
    ic: ["DW7914"], photos: [], client: "완성차 업체",
    purpose: "완성차 OHC(오버헤드 콘솔)의 물리 버튼을 정전용량 터치로 전환하면서도, 버튼을 누르는 손맛은 그대로 유지하고 싶다는 요청에서 시작된 프로젝트입니다.",
    specs: [["MCU", "PIC18F26K40"], ["햅틱 드라이버", "DW7914"], ["입력 방식", "정전용량 터치 (기존 필름 재사용)"], ["구현 기능", "기어 변속 표시등 · 비상(EMG) 버튼"]],
    highlights: ["정전용량 터치 + DW7914 햅틱 통합 보드", "기어 변속 LED / 비상 버튼 로직 동시 처리", "기존 터치 필름·커넥터 재사용으로 개발 기간 단축"],
    deploy: "완성차 OEM向 데모 보드로 제작했고, 가장 강한 햅틱 파형까지 검증을 완료했습니다."
  },

  /* ---------- Building ---------- */
  {
    id: "mitsubishi", wing: "building", status: "done",
    title: "엘리베이터 햅틱 버튼", feel: "눌렀다는 확신을 버튼 안에서 만듭니다.",
    ic: ["DW791x"], photos: [], client: "엘리베이터 제조사 · 일본",
    purpose: "일본 엘리베이터 제조사向으로, 물리 버튼 대비 손색없는 햅틱 반응을 구현해 달라는 요청에서 시작되었습니다.",
    specs: [["평가보드", "STM32F469I-DISCO"], ["햅틱 드라이버", "DW791x"], ["커넥터", "현지 규격 2핀 커넥터 호환"]],
    highlights: ["STM32F469I-DISCO 기반 햅틱 버튼 디자인 검증", "현지 사용 커넥터 그대로 적용해 실장 호환성 확보", "일본 지사 샘플 1세트 전달 완료"],
    deploy: "일본 지사에 샘플이 전달되었고, 데모 자료가 별도로 정리되어 있습니다."
  },
  {
    id: "psad", wing: "building", status: "progress",
    title: "액추에이터 겸용 센서 버튼 (PSAD)", feel: "별도 센서 없이, 버튼이 눌려 있음을 스스로 알아챕니다.",
    ic: ["DW7917"], photos: [],
    purpose: "엘리베이터 버튼처럼 오래, 자주 눌리는 버튼에서 별도 센서 없이 원가를 낮추면서도 '눌려있음'을 정확히 감지하고 싶다는 목표에서 출발했습니다.",
    specs: [["햅틱 드라이버", "DW7917"], ["액추에이터", "LRA (센서 겸용)"], ["감지 방식", "햅틱 재생 직후 탐침 신호 + ADC 측정"]],
    highlights: ["별도 센서 없이 부품 수·원가 절감", "햅틱 재생 직후 탐침 신호로 체류(DWELL) 판별", "이론 모델 기반 최적 탐침 타이밍 도출 완료"],
    deploy: "이론 검증은 마쳤고, 사람이 인지하지 못하는 최소 신호 크기를 찾는 실증 단계입니다."
  },
  {
    id: "helv", wing: "building", status: "progress",
    title: "엘리베이터 버튼 양산 플랫폼", feel: "PSAD 기술을 양산 가능한 제품으로.",
    ic: ["DW7917"], photos: [],
    purpose: "PSAD 버튼 기술을 실제 양산 가능한 엘리베이터 버튼 제품으로 완성하기 위한 펌웨어·하드웨어 플랫폼입니다.",
    specs: [["MCU", "AT32L021F8U7"], ["햅틱 드라이버", "DW7917"], ["부트로더", "Web Serial 기반 IAP"]],
    highlights: ["양산 대응 펌웨어 아키텍처 완비", "Web Serial 기반 현장 업데이트 지원", "PoC 검증 완료, 양산 단계 진행 중"],
    deploy: "PoC 검증을 마치고 양산 단계로 이어지고 있습니다."
  },
  {
    id: "fsr", wing: "building", status: "done",
    title: "압력 감지 햅틱 버튼 (FSR)", feel: "누르는 힘을 읽고, 힘에 맞춰 돌려줍니다.",
    ic: ["FSR + Haptic"], photos: [], client: "가전 제조사",
    purpose: "가전제품 표면에 물리 버튼 없이도 명확한 클릭감을 주고 싶다는 고객사 요청으로 제작된 데모입니다.",
    specs: [["감지 방식", "FSR 압력 센서"], ["제어보드", "ESP32-C3"]],
    highlights: ["물리 버튼 없는 가전 표면에 클릭 피드백 구현", "고객 요청 기반 맞춤 제작", "보드 회로·PCB 자료 보유"],
    deploy: "고객 요청에 따라 데모 제작을 완료했고, 보드 회로 자료를 보유하고 있습니다."
  },

  /* ---------- PC · Gaming ---------- */
  {
    id: "mouse", wing: "pc", status: "done",
    title: "하이브리드 햅틱 마우스", feel: "두 드라이버를 조합한 정밀 커서 햅틱과 클릭 햅틱.",
    ic: ["DW7917", "DW7802"], photos: [], client: "마우스 브랜드 · 해외",
    purpose: "PC 주변기기 시장에서 커서 정밀 햅틱과 버튼 클릭 햅틱을 동시에 지원하는 마우스를 만들고 싶다는 요청에서 출발했습니다.",
    specs: [["햅틱 드라이버", "DW7917 + DW7802"], ["MCU", "STM32F072"], ["기능", "정밀 커서 햅틱 + 버튼 클릭 햅틱 결합"]],
    highlights: ["두 종류 드라이버를 한 보드에 결합한 하이브리드 구성", "해외 마우스 브랜드向 2차 PoC까지 진행", "고객向 기술 지원 가이드 문서 완비"],
    deploy: "해외 마우스 브랜드向 2차 PoC를 완료했고, 기술 지원 가이드까지 준비되어 있습니다."
  },
  {
    id: "keyboard", wing: "pc", status: "progress",
    title: "홀센서 햅틱 키보드", feel: "홀센서 신호만으로 키 입력에 반응합니다.",
    ic: ["DW7917"], photos: [],
    purpose: "키보드의 홀센서 신호만으로 클릭 여부를 판별해 햅틱을 재생하는, 부가 센서 없는 키보드 햅틱화를 목표로 합니다.",
    specs: [["MCU", "AT32L021"], ["햅틱 드라이버", "DW7917"], ["감지", "3채널 홀센서 ADC"]],
    highlights: ["별도 센서 없이 홀센서 신호로 키 입력 감지", "3채널 동시 감지로 다중 키 대응", "보드 브링업 및 햅틱 시나리오 개발 진행 중"],
    deploy: "보드 브링업과 햅틱 시나리오 개발이 진행 중입니다."
  },
  {
    id: "controller", wing: "pc", status: "done",
    title: "무선 게임 컨트롤러", feel: "배터리 하나로 손 안에 전해지는 게임의 질감.",
    ic: ["DW7917"], photos: [],
    purpose: "무선 게임 컨트롤러의 제한된 내부 공간에서도 배터리 하나로 안정적인 햅틱을 구현하고 싶다는 요청에서 시작했습니다.",
    specs: [["햅틱 드라이버", "DW7917"], ["전원", "배터리 3.7V 직결"], ["통신", "무선(RF)"]],
    highlights: ["초소형 실장으로 좁은 컨트롤러 내부 공간 대응", "배터리 직결 구조로 부품 수 최소화", "신규 보드 제작 및 기구 조립 완료"],
    deploy: "신규 보드 제작과 기구 조립을 완료했고, GUI 자료를 보유하고 있습니다."
  },
  {
    id: "vibracing", wing: "pc", status: "done", featured: true,
    title: "풀모션 레이싱 시뮬레이터", feel: "시트·핸들·페달이 함께 만드는 차체의 움직임.",
    ic: ["멀티채널"], photos: [],
    purpose: "레이싱 시뮬레이션 경험을 시트-핸들-페달까지 확장해, 완성차 컨퍼런스와 CES에서 임팩트 있는 체험을 제공하기 위해 기획되었습니다.",
    specs: [["구동 채널", "시트 · 스티어링 · 페달 멀티채널"], ["센서", "IMU"], ["통신", "RF 무선 핸들"]],
    highlights: ["시트·스티어링·페달 동시 구동으로 전신 몰입감 구현", "IMU 센서 연동으로 실제 주행감과 동기화", "완성차 컨퍼런스 · CES 부스 전시"],
    deploy: "2025년 완성차 업체의 바디감성 컨퍼런스, 2026년 CES 부스에 전시되었습니다."
  },
  {
    id: "a2v", wing: "pc", status: "done",
    title: "게이밍 체어 통합 라이브러리", feel: "등받이와 시트 진동을 하나의 SDK로.",
    ic: ["A2V SDK"], photos: [],
    purpose: "게이밍 체어 양산 과정에서 등받이·시트 진동을 하나의 SDK로 통합 제어하고 싶다는 요청에서 출발했습니다.",
    specs: [["제어 방식", "MCU + Windows 통합 라이브러리(A2V)"]],
    highlights: ["등받이·시트 다채널 진동을 SDK 하나로 통합 제어", "양산 적용 완료", "배포 버전 관리 체계 운영 중"],
    deploy: "양산에 적용되었고, 배포 버전 관리 체계를 운영 중입니다."
  },

  /* ---------- Fitness ---------- */
  {
    id: "vike", wing: "fitness", status: "done",
    title: "실내 자전거 햅틱 컨트롤러", feel: "주행 저항과 심박의 변화를 손끝으로.",
    ic: ["DWA Haptic"], photos: [],
    purpose: "실내 자전거에서 주행 저항과 심박 변화를 손끝으로 느끼게 하고 싶다는 아이디어에서 시작했습니다.",
    specs: [["입력", "좌/우 핸들바 컨트롤러"], ["제어 SW", "Windows GUI 시뮬레이터"], ["패턴", "좌우 각기 다른 3가지 진동"]],
    highlights: ["좌/우 컨트롤러에 서로 다른 3가지 진동 패턴 구현", "가상 라이더의 저항·심박 변화를 GUI로 시뮬레이션", "해외 지사 데모 전달, 피드백 수렴 중"],
    deploy: "해외 지사에 데모 1세트를 전달해 피드백을 받는 단계입니다."
  },

  /* ---------- Entertainment ---------- */
  {
    id: "pecan", wing: "entertainment", status: "done",
    title: "CES 인터랙티브 터치 데모", feel: "물방울과 물결이 손끝에서 반응합니다.",
    ic: ["Piezo Driver"], photos: [],
    purpose: "CES 부스에서 방문객이 직접 손으로 만지고 반응을 느낄 수 있는 임팩트 있는 체험형 데모가 필요했습니다.",
    specs: [["디스플레이", "13.3\" 2K 플렉서블 AMOLED"], ["햅틱", "Piezo Driver"], ["연산", "Raspberry Pi 4 + Qt"]],
    highlights: ["물방울·물결 등 손끝 반응형 인터랙션 시나리오 다수 구현", "플렉서블 OLED와 압전 햅틱의 결합", "CES 부스 전시용 제작, 현지 FAE팀 전달"],
    deploy: "CES 부스 전시용으로 제작을 완료해 현지 FAE팀에 전달했습니다."
  },
  {
    id: "cheer", wing: "entertainment", status: "done",
    title: "응원 밴드 햅틱 액세서리", feel: "응원하는 순간을 손목으로 함께 느낍니다.",
    ic: ["DWA Haptic"], photos: [],
    purpose: "공연·스포츠 관람 중에도 착용할 수 있는 햅틱 응원 액세서리 아이디어에서 출발했습니다.",
    specs: [["형태", "웨어러블 밴드"]],
    highlights: ["공연·스포츠 응원 상황 맞춤 웨어러블 폼팩터", "해외 양산 가능성 검토 중"],
    deploy: "해외 양산 가능성을 검토하는 단계입니다."
  },

  /* ---------- Wearable ---------- */
  {
    id: "watchcbt", wing: "wearable", status: "progress",
    title: "웨어러블 알림 햅틱 모듈", feel: "손목 위에서 조용히 구분되는 알림.",
    ic: ["DW7601"], photos: [], client: "웨어러블 제조사",
    purpose: "스마트워치처럼 극도로 제한된 공간에서도 알림 햅틱을 구현할 수 있는지 확인하기 위한 웨어러블 모듈입니다.",
    specs: [["햅틱 드라이버", "DW7601"], ["형태", "초소형 웨어러블 폼팩터"]],
    highlights: ["극소형 폼팩터에 최적화된 알림 전용 드라이버", "웨어러블 제조사向 드라이버 코드 제공"],
    deploy: "드라이버 코드 제공과 함께 기술 제안 자료를 준비하는 단계입니다."
  },

  /* ---------- Platform ---------- */
  {
    id: "multich", wing: "platform", status: "done",
    title: "64채널 동시구동 평가보드", feel: "여러 채널을 한 번에 구동해 비교합니다.",
    ic: ["DW7914"], photos: [],
    purpose: "패널·매트릭스처럼 다수의 액추에이터를 동시에 구동해야 하는 대형 응용을 위해, 채널 확장의 한계를 검증하고자 만든 기술 플랫폼입니다.",
    specs: [["햅틱 드라이버", "DW7914"], ["채널 구성", "최대 8x8 (64채널)"], ["제어", "시프트 레지스터 기반 MUX"]],
    highlights: ["64채널 개별·동시 구동 검증 완료", "시프트 레지스터 구조로 채널 수 실질적 무한 확장 가능", "대형 어레이형 햅틱 응용(패널, 매트릭스 UI) 대응 가능성 확보"],
    deploy: "채널 수를 실질적으로 무한히 확장할 수 있는 가능성을 검증 완료했습니다."
  },
  {
    id: "waveplayer", wing: "platform", status: "progress",
    title: "오디오 → 햅틱 변환 플레이어", feel: "소리의 파형이 그대로 촉감이 됩니다.",
    ic: ["DW7917"], photos: [],
    purpose: "소리의 파형 자체를 촉감으로 변환해 재생하는 콘셉트를 실제 하드웨어로 구현하고자 시작한 프로젝트입니다.",
    specs: [["입력", "microSD WAV 오디오"], ["신호처리", "저역통과 필터(LPF)"], ["햅틱 드라이버", "DW7917"], ["UI", "OLED 디스플레이 + 물리 버튼"]],
    highlights: ["오디오 파형을 실시간으로 햅틱으로 변환하는 독자 신호처리", "독립 실행형 OLED + 버튼 UI로 휴대성 확보", "펌웨어·보드 설계 진행 중"],
    deploy: "펌웨어 아키텍처와 보드 설계를 진행하고 있습니다."
  },
  {
    id: "autotune", wing: "platform", status: "progress",
    title: "자동 햅틱 튜닝 벤치", feel: "액추에이터마다 다른 반응을 자동으로 맞춥니다.",
    ic: ["DW7917"], photos: [],
    purpose: "액추에이터마다 다른 진동 반응을 사람이 일일이 튜닝하지 않고 자동으로 최적화하기 위한 R&D 장비입니다.",
    specs: [["햅틱 드라이버", "DW7917"], ["센서", "IIS3DWB 가속도 센서"], ["MCU", "AT32L021"]],
    highlights: ["가속도 센서로 액추에이터 실측 반응을 자동 수집", "측정값 기반 최적 구동 파라미터 자동 산출 목표", "현재 GUI 디자인 단계, 보드 설계는 이후 진행 예정"],
    deploy: "현재는 GUI 디자인 단계이며, 보드 설계는 이후 단계로 계획되어 있습니다."
  },
  {
    id: "piezoeval", wing: "platform", status: "done",
    title: "Piezo 드라이버 평가 앱", feel: "Piezo 구동을 바로 확인하는 평가 도구.",
    ic: ["Piezo Driver"], photos: [],
    purpose: "압전(Piezo) 액추에이터의 구동 특성을 빠르게 검증하기 위한 사내 평가 툴입니다.",
    specs: [["드라이버", "Piezo Driver"]],
    highlights: ["압전 액추에이터 전용 평가 GUI", "2차 업그레이드 준비 중"],
    deploy: "2차 업그레이드를 준비 중입니다."
  },
  {
    id: "jtouch", wing: "platform", status: "done",
    title: "터치 응답성 데모", feel: "터치와 햅틱이 얼마나 빨리 만나는지 확인합니다.",
    ic: ["DWA Haptic"], photos: [],
    purpose: "정전용량 터치와 햅틱의 조합이 실제로 어느 정도의 반응 속도와 느낌을 주는지 검증하기 위한 데모입니다.",
    specs: [],
    highlights: ["정전용량 터치 + 햅틱 반응성 검증", "필름 커버 구조 최적화로 촉감 개선"],
    deploy: "필름 커버 구조 최적화와 진동 세기 조정을 완료했습니다."
  },
  {
    id: "vibstation", wing: "platform", status: "done",
    title: "휴대용 멀티 시나리오 데모기", feel: "여러 진동을 한 기기에서 비교 체험합니다.",
    ic: ["DWA Haptic"], photos: [],
    purpose: "여러 진동 시나리오를 짧은 시간 안에 비교 체험할 수 있는 휴대용 데모기가 필요해 제작되었습니다.",
    specs: [],
    highlights: ["하나의 기기에서 여러 진동 시나리오 비교 체험 가능", "휴대형 폼팩터로 현장 시연에 최적화"],
    deploy: "제작 및 전달을 완료했습니다."
  }
];

/* 의뢰 작업: 고객 요구 → 결과물. exhibit는 EXHIBITS의 id */
window.COMMISSIONS = [
  { exhibit: "adas-pad", client: "자동차 부품 제조사", where: "일본", brief: "주행 중 경고를 방향별로 즉시 알려 주는 인터페이스.", delivered: "ADAS Haptic PAD — 8채널, 좌·우 경고 진동." },
  { exhibit: "mitsubishi", client: "엘리베이터 제조사", where: "일본", brief: "물리 버튼에 뒤지지 않는 엘리베이터 햅틱 버튼.", delivered: "엘리베이터 햅틱 버튼 데모 — 일본 지사 샘플 1세트 전달." },
  { exhibit: "tesla", client: "완성차 업체", where: "", brief: "물리 버튼을 터치로 바꾸되 누르는 손맛은 유지.", delivered: "OHC 터치·햅틱 통합 보드 — 가장 강한 햅틱 파형까지 검증." },
  { exhibit: "mouse", client: "마우스 브랜드", where: "해외", brief: "정밀 커서 햅틱과 클릭 햅틱을 함께 지원하는 마우스.", delivered: "하이브리드 햅틱 마우스 — 2차 PoC 완료, 기술 지원 가이드 제공." },
  { exhibit: "fsr", client: "가전 제조사", where: "", brief: "물리 버튼 없는 가전 표면의 명확한 클릭감.", delivered: "압력 감지 햅틱 버튼 데모 — 보드 회로 자료 보유." }
];

/* 랩 도구 */
window.LAB_TOOLS = [
  { tag: "TUNING", name: "HapTune Studio", desc: "파형을 만들고 SAC Board로 바로 확인하며 조율하는 튜닝 도구." },
  { tag: "HARDWARE", name: "SAC Board v2.0", desc: "DW7917과 DW7802를 지원하는 평가 보드." },
  { tag: "KNOWLEDGE", name: "HDL Wiki", desc: "햅틱 디자인 지식과 드라이버 정보를 모은 고객용 위키." },
  { tag: "AUTOMATION", name: "AutoTune · g Scope", desc: "자동 튜닝과 가속도 측정으로 결과를 확인하는 벤치." }
];

window.DRIVER_ICS = [
  { name: "DW7601", note: "웨어러블", tone: "neutral" },
  { name: "DW7802", note: "SAC Board 지원", tone: "blue" },
  { name: "DW7912", note: "", tone: "teal" },
  { name: "DW7914", note: "", tone: "coral" },
  { name: "DW7917", note: "플래그십 · I2C 0x59", tone: "coral" },
  { name: "DW3M120", note: "고전압 Piezo 드라이버", tone: "purple" }
];
