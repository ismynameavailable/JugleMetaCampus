// map.js

// 맵 클래스 정의
window.GameMap = class GameMap {
  constructor(name, imagePath, initialX, initialY, walls) {
    this.name = name;
    this.image = new Image();
    this.image.src = imagePath;
    this.initialX = initialX;
    this.initialY = initialY;
    this.walls = walls;
  }
};

function changeMap(mapName) {
  if (mapName === "cafe") {
    currentMap = cafeMap;
  } else if (mapName === "dorm") {
    currentMap = dormMap;
  }

  bgX = canvas.width / 2 - currentMap.initialX;
  bgY = canvas.height / 2 - currentMap.initialY;
}

window.mapChangeZones = [
  {
    name: "cafe",
    x: 90,
    y: 150,
    width: 30,
    height: 30,
    options: ["", ""],
  },
  // 필요한 zone 추가 가능
];

window.checkZoneProximity = function () {
  const charXonMap = -bgX + canvas.width / 2;
  const charYonMap = -bgY + canvas.height / 2;

  for (let zone of mapChangeZones) {
    const inX = charXonMap > zone.x && charXonMap < zone.x + zone.width;
    const inY = charYonMap > zone.y && charYonMap < zone.y + zone.height;

    if (inX && inY) {
      return zone;
    }
  }
  return null;
};

// 전역 맵 정의
window.dormMap = new GameMap("dorm", "/static/image/dorm.png", 105, 130, [
  { x: -40, y: 10, width: 50, height: 158 },
  { x: 125, y: 10, width: 50, height: 158 },
  { x: 0, y: 0, width: 130, height: 50 },
  { x: 0, y: 170, width: 130, height: 10 },
  { x: 49, y: 128, width: 38, height: 42 },
  { x: 49, y: 50, width: 38, height: 37 },
]);

window.cafeMap = new GameMap("cafe", "/static/image/cafe.png", 105, 130, [
  { x: -40, y: 10, width: 50, height: 158 },
  { x: 125, y: 10, width: 50, height: 158 },
  { x: 0, y: 0, width: 130, height: 50 },
  { x: 0, y: 170, width: 130, height: 10 },
  { x: 49, y: 128, width: 38, height: 42 },
  { x: 49, y: 50, width: 38, height: 37 },
]);

// 다른 맵도 필요 시 추가
window.currentMap = window.dormMap;

// 전역 상태
window.canvas = null;
window.ctx = null;
window.bgX = 0;
window.bgY = 0;
window.walls = currentMap.walls;

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
  const charHalfHeight = 16;

  for (let wall of walls) {
    const inX =
      charXonMap + charHalfWidth > wall.x &&
      charXonMap - charHalfWidth < wall.x + wall.width;
    const inY =
      charYonMap + charHalfHeight > wall.y &&
      charYonMap - charHalfHeight < wall.y + wall.height;

    if (inX && inY) return true;
  }
  return false;
};
