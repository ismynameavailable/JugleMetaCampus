let character = new Image();
let walkFront, walkBack, walkRight, walkLeft;
let charX, charY;
let keys = {};
let speed = 5;
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

  character = walkFront[0];
}

function draw() {
  // canvas = document.getElementById("gameCanvas");
  // ctx = canvas.getContext("2d");

  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

  // bgX = canvas.width / 2 - map.initialX;
  // bgY = canvas.height / 2 - map.initialY;

  // walls = map.walls;
  // background = map.image;

  isBtnShow = false;

  setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let nextBgX = 0;
    let nextBgY = 0;

    let realspeed = speed;

    if (keys["Shift"]) {
      realspeed *= 1.5;
    }

    if (keys["ArrowLeft"]) {
      nextBgX = +1;
      currentDirection = "left";
    }
    if (keys["ArrowRight"]) {
      nextBgX = -1;
      currentDirection = "right";
    }
    if (keys["ArrowUp"]) {
      nextBgY = 1;
      currentDirection = "back";
    }
    if (keys["ArrowDown"]) {
      nextBgY = -1;
      currentDirection = "front";
    }

    if (nextBgX != 0 && nextBgY != 0) {
      realspeed = Math.sqrt(realspeed ** 2 / 2);
    }

    nextBgX *= realspeed;
    nextBgY *= realspeed;

    bgX += isBlocked(bgX + nextBgX, bgY) ? 0 : nextBgX;
    bgY += isBlocked(bgX, bgY + nextBgY) ? 0 : nextBgY;

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

    // 배경과 캐릭터 그리기
    ctx.drawImage(background, bgX, bgY);
    ctx.drawImage(character, charX - 32, charY - 32, 64, 64);

    // 포탈 영역 시각화
    (currentMap.portals || []).forEach((zone) => {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(zone.x + bgX, zone.y + bgY, zone.width, zone.height);
    });

    window.walls.forEach((wall) => {
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.strokeRect(wall.x + bgX, wall.y + bgY, wall.width, wall.height);
    });

    //  zone proximity 감지
    const zone = checkZoneProximity();
    const optionBox = document.getElementById("zone-options");
    const zoneTitle = document.getElementById("zone-title");
    const zoneButtons = document.getElementById("zone-buttons");

    if (zone) {
      if (!isBtnShow) {
        isBtnShow = true;
        optionBox.style.display = "block";
        zoneTitle.innerText = `${zone.name} 근처입니다.`;
        zoneButtons.innerHTML = ""; // 버튼 초기화

        // 버튼 생성: 현재 맵 이름 제외
        for (const opt of zone.options) {
          if (opt.target !== currentMap.name) {
            const btn = document.createElement("button");
            btn.innerText = opt.label;
            btn.onclick = () => {
              console.log("✅ 클릭됨!", opt.target); // 이거 추가
              changeMap(opt.target);
            };
            zoneButtons.appendChild(btn);
          }
        }
      }
    } else {
      if (isBtnShow) {
        isBtnShow = false;
        optionBox.style.display = "none";
      }
    }

    // requestAnimationFrame(draw);
  }, 50);
}
