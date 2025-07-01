let map = {"image": new Image, "name": ""};
let walkFront, walkBack, walkRight, walkLeft;
let walls, npcs, portals;

let keys = {
  "Shift":false
};
let frame = 0;
let frameDelay = 0;
let walkdir = {};
let nick;

let P_WIDTH = 50;
let P_HEIGHT = 50;

let csrfToken = "";

let debug = false;
debug = true;

let loop;

$(document).ready(function () {
  csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  initEventListeners();
})

function initEventListeners() {
  document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  loadResource();
}

function loadResource(target_map="", locNum=-1) {
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

  $.ajax({
    url: '/join',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': csrfToken
    },
    data: {},
    success: function (data) {
      nick = data["nick"];
      $.ajax({
        url: `/loading?map=${target_map}&locNum=${locNum}`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-CSRFToken': csrfToken
        },
        success: function (data) {
          walls = data["walls"];
          portals = data["portals"];
          npcs = data["npcs"];
          npcs.forEach(npc => {
            npc["image"] = new Image();
            npc["image"].src = npc["imagePath"];
          });
          map["image"].src = data["mapImagePath"];
          map["name"] = data["mapName"];

          console.log(data); // 서버 응답 내용
          initgame();
        },
      });
    }
  });
}

let canvas;
let ctx;

function initgame() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const directionMap = {
    front: walkFront,
    back: walkBack,
    left: walkLeft,
    right: walkRight,
  };

  const optionBox = document.getElementById("zone-options");
  const zoneTitle = document.getElementById("zone-title");
  const zoneButtons = document.getElementById("zone-buttons");
  isBtnShow = false;
  optionBox.style.display = "none";

  
  loop = setInterval(function () {
    let vx = 0, vy = 0;

    if (keys["ArrowLeft"]) {
      vx = -1;
    }
    if (keys["ArrowRight"]) {
      vx = +1;
    }
    if (keys["ArrowUp"]) {
      vy = -1;
    }
    if (keys["ArrowDown"]) {
      vy = +1;
    }
    if (keys["Shift"]) {
      vx *= 1.7;
      vy *= 1.7;
    }

    frameDelay++;
    if (frameDelay % (3 - 2 * Number(keys["Shift"])) === 0) {
      frame = (frame + 1) % 6;
    }

    $.ajax({
      url: `/connect?vx=${vx}&vy=${vy}`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-CSRFToken': csrfToken
      },
      success: function (data) {
        function G2L (x, y) {
          return [canvas.width / 2 - (data["game"][nick]["x"] - x), canvas.height / 2 - (data["game"][nick]["y"] - y)]
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loc = G2L(0,0)
        ctx.drawImage(map["image"], loc[0], loc[1]);

        npcs.forEach((npc, i) => {
          loc = G2L(npc["x"], npc["y"])
          ctx.drawImage(npc["image"], loc[0], loc[1], 20, 20);
        });

        Object.keys(data["game"]).forEach((key) => {
          if (data["game"][key]["map"] == map["name"]) {
            if (walkdir[key] == null) {
              walkdir[key] = "right"
            }
            if (data["game"][key]["vy"] < 0) {
              walkdir[key] = "back"
            } else if (data["game"][key]["vy"] > 0) {
              walkdir[key] = "front"
            } else if (data["game"][key]["vx"] < 0) {
              walkdir[key] = "left"
            } else if (data["game"][key]["vx"] > 0) {
              walkdir[key] = "right"
            }
            if (data["game"][key]["vx"] == 0 && data["game"][key]["vy"] == 0) {
              img = directionMap[walkdir[key]][0]
            } else {
              img = directionMap[walkdir[key]][frame]
            }

            loc = G2L(data["game"][key]["x"] - P_WIDTH / 2, data["game"][key]["y"] - P_HEIGHT / 2)
            ctx.drawImage(img, loc[0], loc[1], P_WIDTH, P_HEIGHT);

            ctx.fillStyle = "#fff";
            loc = G2L(data["game"][key]["x"] - P_WIDTH / 2, data["game"][key]["y"] + P_HEIGHT / 2)
            ctx.fillRect(loc[0], loc[1], P_WIDTH, 12);

            ctx.fillStyle = "#000";
            ctx.textAlign = "center"
            loc = G2L(data["game"][key]["x"], data["game"][key]["y"] + P_HEIGHT / 2 + 10)
            ctx.fillText(key, loc[0], loc[1])
  
          }
        });

        if (debug) {
          //포탈 영역 시각화
          portals.forEach((zone) => {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            loc = G2L(zone["x"], zone["y"])
            ctx.strokeRect(loc[0], loc[1], zone["width"], zone["height"]);
          });

          //충돌 범위 시각화
          walls.forEach((wall) => {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
            loc = G2L(wall["x"], wall["y"])
            ctx.strokeRect(loc[0], loc[1], wall["width"], wall["height"]);
          });
        }

        if (data["game"][nick]["portal"] != null) {
          if (portals[data["game"][nick]["portal"]]["options"].length == 1) {
            loadResource(target_map = portals[data["game"][nick]["portal"]]["options"][0]["target"], portals[data["game"][nick]["portal"]]["options"][0]["locNum"])
            clearInterval(loop)
          }
          if (!isBtnShow) {
            isBtnShow = true;
            optionBox.style.display = "block";
            zoneTitle.innerText = `${portals[data["game"][nick]["portal"]]["name"]} 근처입니다.`;
            zoneButtons.innerHTML = ""; // 버튼 초기화

            // 버튼 생성: 현재 맵 이름 제외
            for (const opt of portals[data["game"][nick]["portal"]]["options"]) {
              if (opt.target !== map["name"]) {
                const btn = document.createElement("button");
                btn.innerText = opt.label;
                btn.onclick = () => {
                  console.log("✅ 클릭됨!", opt.target); // 이거 추가
                  loadResource(target_map = opt.target, locNum = opt.locNum)
                  clearInterval(loop)
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
      },
    });

  }, 50);
}