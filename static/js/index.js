$(document).ready(function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const background = new Image();
  background.src = "/static/image/image.png"; // 배경 이미지 경로

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

  let bgX = 0;
  let bgY = 0;

  const speed = 3;
  let keys = {};
  let frame = 0;
  let frameDelay = 0;
  let currentDirection = "front";

  const walls = [
    { x: -167, y: 10, width: 300, height: 250 },
    { x: 280, y: 10, width: 300, height: 250 },
  ];

  function isBlocked(nextBgX, nextBgY) {
    const charXonMap = -nextBgX + canvas.width / 2;
    const charYonMap = -nextBgY + canvas.height / 2;

    for (let wall of walls) {
      const inX =
        charXonMap + 32 > wall.x && charXonMap - 32 < wall.x + wall.width;
      const inY =
        charYonMap + 32 > wall.y && charYonMap - 32 < wall.y + wall.height;
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

    // 벽 시각화
    for (let wall of walls) {
      ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
      ctx.fillRect(wall.x + bgX, wall.y + bgY, wall.width, wall.height);
    }

    requestAnimationFrame(draw);
  }

  draw();
});
