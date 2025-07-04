let map = {"image": new Image, "name": "", "width":1, "height":1};
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

let loop;
let errCount=0;

let currentLine = 0;
let dialogues = [];
let sell;
let questId = 0;

let place = "";
let itemId = -1;

let itemImgs = {
    0: new Image(),
    1: new Image(),
    2: new Image(),
    3: new Image()
  };
  itemImgs[0].src = "/static/image/Water.png";       // 삼다수
  itemImgs[1].src = "/static/image/Coca.png";        // 코카콜라
  itemImgs[2].src = "/static/image/Pretzel.png";     // 하겐다즈
  itemImgs[3].src = "/static/image/Pretzel.png";     // 프레첼

let isPopupShow, isBtnShow;
$(document).ready(function () {
  csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  initEventListeners();
  $(".dialogue").css("display","none");
  $(".store").css("display","none");
  // test();
  quest_start(0);
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
      $("#nickname").text(nick)
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
          map["width"] = data["width"];
          map["height"] = data["height"];

          $("#mapName").text("현재 위치: " + map["name"]);
          if (map["name"] == "교육동 B1F 편의점") {
            place = "store";
          }
          else if (map["name"] = "교육동 B1F 카페") {
            place = "cafe";
          }

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
  isPopupShow = false;
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
        // console.log(data["chat"])
        function G2L (x, y) {
          return [canvas.width / 2 - (data["game"][nick]["x"] - x), canvas.height / 2 - (data["game"][nick]["y"] - y)]
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loc = G2L(0,0)
        ctx.drawImage(map["image"], loc[0], loc[1], map["image"].width * map["width"], map["image"].height * map["height"]);

        npcs.forEach((npc, i) => {
          loc = G2L(npc["x"], npc["y"])
          ctx.drawImage(npc["image"], loc[0], loc[1], 25, 30);
        });

        Object.keys(data["game"]).forEach((key) => {
          if (data["game"][key]["map"] == data["game"][nick]["map"]) {
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

        $('#money').text(`${data["game"][nick]["money"]}원`)

        $(".chat_list").html("")
        data["chat"].forEach((line) => {
          $(".chat_list").append(`<li>${line["nick"]}: ${line["msg"]}</li>`)
        })

        if (debug) {
          // 포탈 영역 시각화
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
          console.log("플레이어 위치", data["game"][nick]["x"], data["game"][nick]["y"])
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
              if (opt.target !== data["game"][nick]["map"]) {
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
        
        if (data["game"][nick]["npc"] != null) {
          if (keys[" "] && !isPopupShow) {
            isPopupShow = true
            $("#npc_name").text(npcs[data["game"][nick]["npc"]]["name"] + " : ");
            dialogue(npcs[data["game"][nick]["npc"]]["questNum"]);
          }
        }
      },
      error: function (err) {
        errCount++;
        if (errCount > 10) {
          clearInterval(loop)
        }
      }
    });

  }, 50); 
}

function quest_start(questId) {
  $.ajax({
    type: "POST",
    url: "/quest",
    data: { quest_id: questId },
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': csrfToken
    },
    success: function (response) {
      if (response["result"] === "success") {
        console.log(response);
        const { title, description } = response;
        document.getElementById("quest-title").innerHTML = title;
        document.getElementById("quest-content").innerHTML = description;

      }
    }
  });
};

function quest_clear(questId) {
  document.getElementById("dialogue-content").innerHTML = " ";
  isPopupShow = false
  $(".dialogue").slideToggle(500);
  if (sell != null) {
    open_buy_menu(open_buy_menu(sell))
  }
  questId += 1;
  quest_start(questId); // 다음퀘 실행
}

function dialogue(id) {
  $.ajax({
    type: "POST",
    url: "/quest",
    data: { quest_id: id },
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': csrfToken
    },
    success: function (response) {
      if (response["result"] === "success") {
        dialogues = response.dialogues;
        sell = response.sell;
        questId = id;
        currentLine = 0;
        dialogue_continue();
        $(".dialogue").slideToggle(500);
          document.getElementById("continue-btn").addEventListener("click", dialogue_continue);

      }
    }
  });
}

function dialogue_continue() {
  if (currentLine < dialogues.length) {
    document.getElementById("dialogue-content").innerHTML = dialogues[currentLine]["text"];
    currentLine++;
    
  }
  else {
    quest_clear(questId);
  }
}
function test() {
  document.getElementById("quest-btn0").addEventListener('click', function () {
    dialogue(0);
  });
  document.getElementById("quest-btn1").addEventListener('click', function () {
    dialogue(1);
  });
  document.getElementById("quest-btn2").addEventListener('click', function () {
    dialogue(2);
  });
  document.getElementById("quest-btn3").addEventListener('click', function () {
    dialogue(3);
  });
  document.getElementById("continue-btn").addEventListener("click", function() {
    dialogue_continue();
  });
  document.getElementById("loc-store").addEventListener('click', function () {
    place = "store";
    open_buy_menu("store");
  });
  document.getElementById("loc-cafe").addEventListener('click', function () {
    place = "cafe";  
    open_buy_menu("cafe");
  });
}

function open_buy_menu(place) {
  $(".store").css("display","none");
  $(".store").slideToggle(500);
  $("#item-list").html("");
  $.ajax({
    type: "POST",
    url: "/buy_menu",
    data: { loc: place },
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': csrfToken
    },
    success: function (response) {
      if (response["result"] === "success") {
        console.log(response);
        items = response.items;   
        items.forEach(item => {
          item_name = item["name"];
          item_price = item["price"];
          item_id = item["_id"]
          temp_html = `<ul data-item-id="${item_id}"><li>${item_name}</li><li>${item_price}원</li></ul>`;
          $("#item-list").append(temp_html);
        });
      }
    }
  });
}
  $("#item-list").on("click", "ul", function(){
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
      itemId = -1;
    }
    else {
      $("ul").removeClass("selected");
      $(this).addClass("selected");
      itemId = $(this).data("item-id");
    }
  });

  // 버튼 누르면 구매
  $("#buy-btn").on("click", function(){
    // console.log("df");
    buy_item(place, itemId);
  });
  $("#nobuy-btn").on("click", function(){
    $(".store").slideToggle(500);
  });
function buy_item(place, itemId) {
  console.log("ss",itemId);
  if (itemId == -1) {
    console.log("aa");
    $(".test").append("id ",itemId);
    return;
  }
  $.ajax({
    type: "POST",
    url: "/buy_item",
    data: { loc: place, item_id: itemId },
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': csrfToken
    },
    success: function (response) {
      if (response["result"] === "success") {
        console.log(response);
        inventory_update();
      }
    }
  });
}

function inventory_update() {
  $.ajax({
    type: "POST",
    url: "/inventory",
    data: {},
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': csrfToken
    },
    success: function (response) {
      if (response["result"] === "success") {
        // console.log(response);
        const inventory = response.inventory;
        for (let i=1;i<=6;i++) {
          $(`#item-${i} .item-img`).html("");
        }
        inventory.forEach((item, i) => {
          const id = item._id;
          const img = itemImgs[id];
          console.log("inven",id, img);
          if (typeof id === 'number' && img) {
            const imgTag = `<img src="${img.src}"/>`;
            $(`#item-${i + 1} .item-img`).html(imgTag);
          }
        });
      }
    }
  });
}
