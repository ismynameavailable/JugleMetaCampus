let character = new Image();
let walkFront, walkBack, walkRight, walkLeft;
let charX, charY;
let keys = {};
let speed = 3;
let frame = 0;
let frameDelay = 0;
let currentDirection = "front";

function initEventListeners() {
  charX = canvas.width / 2;
  charY = canvas.height / 2;
  loadCharacterImages();

  document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });
}
function loadCharacterImages() {
  walkFront = Array.from({ length: 6 }, (_, i) => {
    const img = new Image();
    img.src = `/static/assets/hero-walk-front/hero-walk-front-${i + 1}.png`;
    return img;
  });
  walkBack = Array.from({ length: 6 }, (_, i) => {
    const img = new Image();
    img.src = `/static/assets/hero-walk-back/hero-walk-back-${i + 1}.png`;
    return img;
  });
  walkRight = Array.from({ length: 6 }, (_, i) => {
    const img = new Image();
    img.src = `/static/assets/hero-walk-right/hero-walk-right-${i + 1}.png`;
    return img;
  });
  walkLeft = Array.from({ length: 6 }, (_, i) => {
    const img = new Image();
    img.src = `/static/assets/hero-walk-left/hero-walk-left-${i + 1}.png`;
    return img;
  });

  character = walkFront[0]; // 초기 이미지
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  const directionMap = {
    front: walkFront,
    back: walkBack,
    left: walkLeft,
    right: walkRight,
  };

  const currentWalkArray = directionMap[currentDirection];
  character = currentWalkArray[frame];

  const zone = checkZoneProximity();
  if (zone) {
    zone.options.forEach((opt, idx) => {
      ctx.fillText(opt, 30, canvas.height - 40 + idx * 20);
    });
  }

  ctx.drawImage(background, bgX, bgY);
  ctx.drawImage(character, charX - 32, charY - 32, 64, 64);

  mapChangeZones.forEach((zone) => {
    ctx.strokeStyle = "red"; // 선 색깔 빨간색
    ctx.lineWidth = 2; // 선 굵기
    ctx.strokeRect(
      zone.x + bgX, // bgX, bgY 적용해야 실제 맵 위치랑 맞음
      zone.y + bgY,
      zone.width,
      zone.height
    );
  });

  const optionBox = document.getElementById("zone-options");

  if (zone) {
    optionBox.style.display = "block";
    document.getElementById(
      "zone-title"
    ).innerText = `${zone.name} 근처입니다.`;
  } else {
    optionBox.style.display = "none";
  }
  requestAnimationFrame(draw);
}
