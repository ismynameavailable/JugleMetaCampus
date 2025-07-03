from flask import Flask, render_template, request, jsonify, session, redirect
from flask_wtf.csrf import CSRFProtect
import threading
import time
import gameInfo
import math

P_SPEED = 5
P_WIDTH = 20
P_HEIGHT = 35


game = {}
gametimer = 0
chat = []


def gamebox():
    global game, gametimer
    while True:
        # print("print")
        for nick in list(game.keys()):
            # print("hello")
            p = game[nick]
            if (gametimer - p["update"] > 2):
                continue

            if not p["vx"] or not p["vy"]:
                g = P_SPEED
            else:
                g = math.sqrt(P_SPEED**2 / 2)

            p["x"] += (
                0
                if (
                    gameInfo.isBlocked(
                        p["x"] + p["vx"] * g, p["y"], P_WIDTH, P_HEIGHT, p["map"]
                    )
                )
                else p["vx"] * g
            )
            p["y"] += (
                0
                if (
                    gameInfo.isBlocked(
                        p["x"], p["y"] + p["vy"] * g, P_WIDTH, P_HEIGHT, p["map"]
                    )
                )
                else p["vy"] * g
            )
            p["portal"] = gameInfo.nearPortal(
                p["x"], p["y"], P_WIDTH, P_HEIGHT, p["map"]
            )

            p["npc"] = gameInfo.nearNPC(
                p["x"], p["y"], p["map"]
            )
        time.sleep(0.05)
        gametimer += 1


app = Flask(__name__, static_folder="./static")
app.config["SECRET_KEY"] = "junglemetacampus"


@app.route("/")
def play():
    nick = session.get("nick", None)
    if nick is None:
        return redirect("/login")

    return render_template("index.html")


@app.route("/login")
def login():
    nick = session.get("nick", None)
    if not nick is None:
        return redirect("/")

    return render_template("login.html")


@app.route("/join", methods=["POST"])  # 포스트 메소드 둘다 사용
def register_or_login():
    global game, gametimer

    nick = session.get("nick", None)
    if nick is None:
        nick = request.form.get("nick")
        # password = request.form.get("pw")

    if not nick in list(game.keys()): 
        # db없이 닉네임을 그냥 번호로 정하는 테스트코드
        game[nick] = {
            "nick": nick,
            "map": "floor",
            "x": gameInfo.maps["floor"]["loc"][0][0],
            "y": gameInfo.maps["floor"]["loc"][0][1],
            "vx": 0,
            "vy": 0,
            "portal": None,
            "npc": None,
            "money": 7000,
            "pocket": [],
            "update": gametimer
        }
        session["nick"] = nick
    return jsonify({"result": "success", "msg": "게임 참가 성공", "nick": nick})
    # 아래 코드는 클라이언트의 로그인 폼 제작 완료 후 위 코드 대신 사용
    # nickname = request.form.get("nick")
    # password = request.form.get("pw")
    # pw_hash = hashlib.sha256(password.encode('utf-8')).hexdigest() # 비밀번호는 반드시 hash기술로 암호화 후 mongodb에 저장해야함

    # user = db.users.find_one({"nickname": nickname})
    # if user:
    #     if (pw_hash == user["password"]) :
    #         session["nick"] = nickname
    #         return jsonify({"result": "success", "action": "login", "msg": "로그인 성공"})
    #     else :
    #         return jsonify({"result": "fail", "err": "Wrong password"})
    # else :
    #     db.users.insert_one({
    #         'nickname': nickname,
    #         'password': pw_hash
    #     })
    #     session["nick"] = nickname
    #     return jsonify({"result": "success", "action": "join", "msg": "회원가입 및 로그인 성공"})


@app.route("/loading", methods=["GET"])
def loading():
    print(game)
    nick = session.get("nick", None)
    map = request.args.get("map")
    locNum = request.args.get("locNum")
    if map != "":
        game[nick]["map"] = map
        game[nick]["x"] = gameInfo.maps[map]["loc"][
            0 if locNum == "-1" else int(locNum)
        ][0]
        game[nick]["y"] = gameInfo.maps[map]["loc"][
            0 if locNum == "-1" else int(locNum)
        ][1]
    return jsonify(
        {
            "mapName": gameInfo.maps[game[nick]["map"]]["name"],
            "mapImagePath": gameInfo.maps[game[nick]["map"]]["imagePath"],
            "width": gameInfo.maps[game[nick]["map"]]["width"],
            "height": gameInfo.maps[game[nick]["map"]]["height"],
            "npcs": gameInfo.maps[game[nick]["map"]]["npcs"],
            "portals": gameInfo.maps[game[nick]["map"]]["portals"],
            "walls": gameInfo.maps[game[nick]["map"]]["walls"],
        }
    )


@app.route("/connect", methods=["GET"])
def connect():
    global game, chat, gametimer
    nick = session.get("nick", None)
    game[nick]["update"] = gametimer

    game[nick]["vx"] = float(request.args.get("vx"))
    game[nick]["vy"] = float(request.args.get("vy"))

    if (len(chat) > 15):
        return jsonify({"result": "success", "game": game, "chat": chat[-15:]})
    else:
        return jsonify({"result": "success", "game": game, "chat": chat})

# quests
def get_quest(quest_id):
    for quest in gameInfo.quests:
        if quest["_id"] == quest_id:
            return quest
    return None

@app.route("/quest", methods=["POST"])
def quest():
    id = int(request.form.get("quest_id"))
    quest = get_quest(id)
    if quest:
        title = quest["title"]
        description = quest["description"]
        dialogues = quest["dialogue"]
        sell = quest["sell"]
        return jsonify({'result':'success', 'id':id, 'title':title, 'description':description, 'dialogues':dialogues, "sell":sell})
    else :
        return jsonify({'result':'fail'})

@app.route("/chat", methods=["POST"])
def send_chat():
    global chat
    chat.append({"nick": session.get("nick", None), "msg": request.form.get("msg")})
    return jsonify({"result": "success"})

@app.route("/buy_menu", methods=["POST"])
def buy_menu():
    loc = request.form.get("loc")
    for place in gameInfo.sales_items:
        if (loc == place["location"]):
            items = place["items"]
            return jsonify({"result": "success", "items": items})
    return jsonify({"result": "fail"})

@app.route("/buy_item", methods=["POST"])
def buy_item():
    loc = request.form.get("loc")
    item_id = int(request.form.get("item_id"))
    items = []
    nick = session.get("nick", None)
    print("nick",nick)
    print("loc", loc)
    print("id",item_id)
    if loc is None or item_id is None:
        return jsonify({"result": "fail"})
    for place in gameInfo.sales_items:
        if (loc == place["location"]):
            items = place["items"]
            break
    for item in items:
        if ((item_id == item["_id"]) and (game[nick]["money"] >= item["price"])):
            game[nick]["money"] -= item["price"]
            game[nick]["pocket"].append(item["_id"])
            return jsonify({"result": "success"})
    return jsonify({"result": "fail"})

@app.route("/inventory", methods=["POST"])
def inventory():
    nick = session.get("nick", None)
    if nick is None or nick not in game:
        return jsonify({"result": "fail", "error": "no user"})

    item_ids = game[nick]["pocket"]
    inventory_items = []

    for place in gameInfo.sales_items:
        for item in place["items"]:
            if item["_id"] in item_ids:
                inventory_items.append(item)

    return jsonify({"result": "success", "inventory": inventory_items})

def server_setup():
    csrf = CSRFProtect()
    csrf.init_app(app)
    app.run("0.0.0.0", port=7141)


if __name__ == "__main__":
    t1 = threading.Thread(target=gamebox)
    t2 = threading.Thread(target=server_setup)
    t1.start()
    t2.start()
    t1.join()
    t2.join()
