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
  walkFront = Array.from(
    { length: 6 },
    (_, i) => `/static/assets/hero-walk-front/hero-walk-front-${i + 1}.png`
  );
  walkBack = Array.from(
    { length: 6 },
    (_, i) => `/static/assets/hero-walk-back/hero-walk-back-${i + 1}.png`
  );
  walkRight = Array.from(
    { length: 6 },
    (_, i) => `/static/assets/hero-walk-right/hero-walk-right-${i + 1}.png`
  );
  walkLeft = Array.from(
    { length: 6 },
    (_, i) => `/static/assets/hero-walk-left/hero-walk-left-${i + 1}.png`
  );

  character.src = walkFront[0];
}

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

  character.src = {
    front: walkFront,
    back: walkBack,
    left: walkLeft,
    right: walkRight,
  }[currentDirection][frame];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, bgX, bgY);
  ctx.drawImage(character, charX - 32, charY - 32, 64, 64);

  requestAnimationFrame(draw);
}
