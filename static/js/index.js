$(document).ready(function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const background = new Image();
  background.src = "/static/image/dorm.png"; // 배경 이미지 경로

  const walkFront = Array.from(
    { length: 6 },
    (_, i) => `/static/assets/hero-walk-front/hero-walk-front-${i + 1}.png`
  );
  const walkBack = Array.from(
    { length: 6 },
    (_, i) => `/static/assets/hero-walk-back/hero-walk-back-${i + 1}.png`
  );
  const walkRight = Array.from(
    { length: 6 },
    (_, i) => `/static/assets/hero-walk-right/hero-walk-right-${i + 1}.png`
  );
  const walkLeft = Array.from(
    { length: 6 },
    (_, i) => `/static/assets/hero-walk-left/hero-walk-left-${i + 1}.png`
  );

  const character = new Image();
  character.src = walkFront[0]; // 초기 이미지

  const charX = canvas.width / 2;
  const charY = canvas.height / 2;

  // !! 보여주고 싶은 맵 위치 (절대좌표 기준)
  const initialMapX = 105;
  const initialMapY = 130;

  // !! 화면 중심에서 그 지점이 보이도록 배경 위치 초기화
  let bgX = canvas.width / 2 - initialMapX;
  let bgY = canvas.height / 2 - initialMapY;

  const speed = 3;
  let keys = {};
  let frame = 0;
  let frameDelay = 0;
  let currentDirection = "front";

  const walls = [
    { x: -40, y: 10, width: 50, height: 158 }, // 왼쪽 벽
    { x: 125, y: 10, width: 50, height: 158 }, // 오른쪽 벽
    { x: 0, y: 0, width: 130, height: 50 }, // 창문
    { x: 0, y: 170, width: 130, height: 10 }, // 바닥
    { x: 49, y: 128, width: 38, height: 42 }, // 코너
    { x: 49, y: 50, width: 38, height: 37 }, // 서랍
  ];

  function isBlocked(nextBgX, nextBgY) {
    const charXonMap = -nextBgX + canvas.width / 2;
    const charYonMap = -nextBgY + canvas.height / 2;

    const charHalfWidth = 16; // 캐릭터 충돌용 너비 (좁게)
    const charHalfHeight = 16; // 캐릭터 충돌용 높이 (발 기준)

    for (let wall of walls) {
      // 충돌 시
      const inX =
        charXonMap + charHalfWidth > wall.x &&
        charXonMap - charHalfWidth < wall.x + wall.width;

      const inY =
        charYonMap + charHalfHeight > wall.y &&
        charYonMap - charHalfHeight < wall.y + wall.height;

      if (inX && inY) return true;
    }
    return false;
  }

  document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });

  document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  function draw() {
    let nextBgX = bgX;
    let nextBgY = bgY;

    if (keys["ArrowLeft"]) {
      nextBgX += speed;
      currentDirection = "left";
    }
    if (keys["ArrowRight"]) {
      nextBgX -= speed;
      currentDirection = "right";
    }
    if (keys["ArrowUp"]) {
      nextBgY += speed;
      currentDirection = "back";
    }
    if (keys["ArrowDown"]) {
      nextBgY -= speed;
      currentDirection = "front";
    }

    if (!isBlocked(nextBgX, nextBgY)) {
      bgX = nextBgX;
      bgY = nextBgY;
    }

    if (Object.values(keys).some(Boolean)) {
      frameDelay++;
      if (frameDelay % 6 === 0) {
        frame = (frame + 1) % 6;
      }
    } else {
      frame = 0;
    }

    if (currentDirection === "front") character.src = walkFront[frame];
    if (currentDirection === "back") character.src = walkBack[frame];
    if (currentDirection === "right") character.src = walkRight[frame];
    if (currentDirection === "left") character.src = walkLeft[frame];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, bgX, bgY);
    ctx.drawImage(character, charX - 32, charY - 32, 64, 64);

    //벽 시각화
    for (let wall of walls) {
      ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
      ctx.fillRect(wall.x + bgX, wall.y + bgY, wall.width, wall.height);
    }

    requestAnimationFrame(draw);
  }

  draw();
});
