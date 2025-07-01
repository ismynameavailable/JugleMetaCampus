// map.js

// 맵 클래스 정의
window.GameMap = class GameMap {
  constructor(name, imagePath, initialX, initialY, walls, portals = []) {
    this.name = name;
    this.image = new Image();
    this.image.src = imagePath;
    this.initialX = initialX;
    this.initialY = initialY;
    this.walls = walls;
    this.portals = portals;
  }
};

function changeMap(mapName) {
  switch (mapName) {
    case "cafe":
      window.currentMap = window.cafeMap;
      break;

    case "store":
      window.currentMap = window.storeMap;
      break;

    case "classroom":
      window.currentMap = window.classroomMap;
      break;

    default:
      window.currentMap = window.dormMap;
  }

  window.walls = window.currentMap.walls;
  window.background = window.currentMap.image;
  window.bgX = canvas.width / 2 - window.currentMap.initialX;
  window.bgY = canvas.height / 2 - window.currentMap.initialY;
  window.portals = window.currentMap.portals;

  const optionBox = document.getElementById("zone-options");
  optionBox.style.display = "none";
  document.getElementById("zone-title").innerText = "";

  console.log("Current map name:", currentMap.name);
  console.log("Portals:", JSON.stringify(currentMap.portals));
  // lastZone = null;
}

let lastZone = null;

window.checkZoneProximity = function () {
  const charXonMap = -bgX + canvas.width / 2;
  const charYonMap = -bgY + canvas.height / 2;

  const zones = window.currentMap.portals || [];

  for (let zone of zones) {
    const inX = charXonMap > zone.x && charXonMap < zone.x + zone.width;
    const inY = charYonMap > zone.y && charYonMap < zone.y + zone.height;

    const isInside = inX && inY;

    //  이전 zone 상태와 달라졌을 때만 로그 출력
    if (isInside && lastZone !== zone.name) {
      console.log(`✅ 감지됨! ${zone.name}`);
      console.log(
        `캐릭터 위치: (${charXonMap.toFixed(1)}, ${charYonMap.toFixed(1)})`
      );
      console.log(
        `Zone 위치: (${zone.x}, ${zone.y}, ${zone.width}, ${zone.height})`
      );
      lastZone = zone.name;
    } else if (!isInside && lastZone !== null) {
      console.log("❌ 포탈에서 벗어남");
      lastZone = null;
    }

    if (isInside) return zone;
  }

  return null;
};

// 전역 맵 정의
window.dormMap = new GameMap(
  "dorm",
  "/static/image/dorm.png",
  105,
  130,
  [
    { x: -40, y: 10, width: 50, height: 158 },
    { x: 125, y: 10, width: 50, height: 158 },
    { x: 0, y: 0, width: 130, height: 50 },
    { x: 0, y: 170, width: 130, height: 10 },
    { x: 49, y: 128, width: 38, height: 42 },
    { x: 49, y: 50, width: 38, height: 37 },
  ],
  // 포탈 정보 추가
  [
    {
      name: "숙소 엘리베이터",
      x: 90,
      y: 140,
      width: 30,
      height: 30,
      options: [
        { label: "1.  카페로 이동", target: "cafe" },
        { label: "2. 편의점으로 이동", target: "store" },
        { label: "3. 교육실로 이동", target: "classroom" },
      ],
    },
  ]
);

window.cafeMap = new GameMap(
  "cafe",
  "/static/image/cafe.png",
  105,
  180,
  [], // ***********잠시비워둠*************
  [
    {
      name: "카페 엘리베이터",
      x: 48,
      y: 250,
      width: 120,
      height: 30,
      options: [
        { label: "1. 기숙사로 이동", target: "dorm" },
        { label: "2. 편의점으로 이동", target: "store" },
        { label: "3. 교육실로 이동", target: "classroom" },
      ],
    },
  ]
);

window.storeMap = new GameMap(
  "store",
  "/static/image/store.png",
  50,
  170,
  [
    { x: -10, y: 10, width: 20, height: 190 }, // 왼쪽 벽
    { x: 175, y: 10, width: 20, height: 190 }, // 오른쪽 벽
    { x: -10, y: 10, width: 205, height: 50 }, // 위쪽 벽(자판기)
    { x: -10, y: 210, width: 205, height: 20 }, // 아랫쪽 벽
    { x: 85, y: 90, width: 20, height: 150 }, // 가운데 물건들
  ], // ***********잠시비워둠*************
  [
    {
      name: "편의점 엘리베이터",
      x: 20,
      y: 170,
      width: 60,
      height: 40,
      options: [
        { label: "1. 카페로 이동", target: "cafe" },
        { label: "2. 기숙사로 이동", target: "dorm" },
        { label: "3. 교육실로 이동", target: "classroom" },
      ],
    },
  ]
);

window.toiletMap = new GameMap(
  "toilet",
  "/static/image/toilet.png",
  105,
  130,
  [], // ***********잠시비워둠*************
  [
    // {
    //   name: "교실 엘리베이터",
    //   x: 20,
    //   y: 190,
    //   width: 60,
    //   height: 40,
    //   options: [
    //     { label: "1. 카페로 이동", target: "cafe" },
    //     { label: "2. 기숙사로 이동", target: "dorm" },
    //     { label: "3. 편의점으로 이동", target: "store" },
    //   ],
    // },
  ]
);

window.classroomMap = new GameMap(
  "classroom",
  "/static/image/classroom.png",
  105,
  130,
  [], // ***********잠시비워둠*************
  [
    {
      name: "교육실 엘리베이터",
      x: 390,
      y: 170,
      width: 40,
      height: 20,
      options: [
        { label: "1. 카페로 이동", target: "cafe" },
        { label: "2. 기숙사로 이동", target: "dorm" },
        { label: "3. 편의점으로 이동", target: "store" },
      ],
    },
    {
      name: "교육실 엘리베이터",
      x: 390,
      y: 580,
      width: 40,
      height: 20,
      options: [
        { label: "1. 카페로 이동", target: "cafe" },
        { label: "2. 기숙사로 이동", target: "dorm" },
        { label: "3. 편의점으로 이동", target: "store" },
      ],
    },
  ]
);

// 다른 맵도 필요 시 추가
window.currentMap = window.dormMap;
window.walls = currentMap.walls;

// 전역 상태
window.canvas = null;
window.ctx = null;
window.bgX = 0;
window.bgY = 0;
window.currentMap = null;
window.walls = [];

window.initMapState = function () {
  window.currentMap = window.dormMap; // <---------------- 처음 시작점
  window.walls = window.currentMap.walls;
};

// 캔버스 초기화
window.initCanvas = function (map, drawCallback) {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  bgX = canvas.width / 2 - map.initialX;
  bgY = canvas.height / 2 - map.initialY;
  walls = map.walls;
  background = map.image;
  // 이미지가 로딩된 경우 바로 실행
  if (map.image.complete) {
    drawCallback();
  } else {
    map.image.onload = () => drawCallback();
  }
};

// 충돌 감지 함수
window.isBlocked = function (nextBgX, nextBgY) {
  const charXonMap = -nextBgX + canvas.width / 2;
  const charYonMap = -nextBgY + canvas.height / 2;

  const charHalfWidth = 16;
  const charHalfHeight = 24;

  for (let wall of walls) {
    const inX =
      charXonMap + charHalfWidth > wall.x &&
      charXonMap - charHalfWidth < wall.x + wall.width;
    const inY =
      charYonMap + charHalfHeight > wall.y && charYonMap < wall.y + wall.height;

    if (inX && inY) return true;
  }
  return false;
};
