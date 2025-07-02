from flask import Flask, render_template, request, jsonify, session, redirect
from flask_wtf.csrf import CSRFProtect
import hashlib
from pymongo import MongoClient
import threading
import time
import gameInfo
import math

P_SPEED = 5
P_WIDTH = 20
P_HEIGHT = 35


uri = "mongodb+srv://khj:3DPYt5G4XljgvZlP@khj.wl2suic.mongodb.net/?retryWrites=true&w=majority&appName=khj&tlsAllowInvalidCertificates=true"
client = MongoClient(uri, 27017)
db = client.metacampus  # 'dbjungle'라는 이름의 db를 만듭니다.

game = {}

def gamebox():
    global game
    while (True):
        # print("print")
        for nick in list(game.keys()):
            # print("hello")
            p = game[nick]

            if (not p["vx"] or not p["vy"]):
                g = P_SPEED
            else :
                g = math.sqrt(P_SPEED**2 / 2)

            p["x"] += 0 if (gameInfo.isBlocked(p["x"] + p["vx"] * g, p["y"], P_WIDTH, P_HEIGHT, p["map"])) else p["vx"] * g
            p["y"] += 0 if (gameInfo.isBlocked(p["x"], p["y"] + p["vy"] * g, P_WIDTH, P_HEIGHT, p["map"])) else p["vy"] * g
            p["portal"] = gameInfo.nearPortal(p["x"], p["y"], P_WIDTH, P_HEIGHT, p["map"])
        time.sleep(0.05)


app = Flask(__name__, static_folder="./static")
app.config['SECRET_KEY'] = "junglemetacampus"


@app.route("/")
def play():
    nick = session.get("nick", None)
    if nick is None:
        return redirect("/login")
    
    return render_template("index.html")


@app.route("/login")
def login():
    nick = session.get("nick", None)
    if (not nick is None):
        return redirect("/")

    return render_template("login.html")


@app.route("/join", methods=["POST"])  # 포스트 메소드 둘다 사용
def register_or_login():
    global game

    nick = session.get("nick", None)
    if (nick is None):
        nick = request.form.get("nick")
        password = request.form.get("pw")

    if (not nick in list(game.keys())):
        # db없이 닉네임을 그냥 번호로 정하는 테스트코드
        game[nick] = {
            "nick": nick,
            "map": "dorm",
            "x": gameInfo.maps["dorm"]["loc"][0][0],
            "y": gameInfo.maps["dorm"]["loc"][0][1],
            "vx": 0,
            "vy": 0,
            "portal": None
        }
        session["nick"] = nick
    return jsonify(
        {"result": "success", "msg": "게임 참가 성공", "nick": nick}
    )
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
    if (map != ""):
        game[nick]["map"] = map
        game[nick]["x"] = gameInfo.maps[map]["loc"][0 if locNum == "-1" else int(locNum)][0]
        game[nick]["y"] = gameInfo.maps[map]["loc"][0 if locNum == "-1" else int(locNum)][1]

    return jsonify(
        {
            "mapName": gameInfo.maps[game[nick]["map"]]["name"],
            "mapImagePath": gameInfo.maps[game[nick]["map"]]["imagePath"],
            "npcs": gameInfo.maps[game[nick]["map"]]["npcs"],
            "portals": gameInfo.maps[game[nick]["map"]]["portals"],
            "walls": gameInfo.maps[game[nick]["map"]]["walls"],
        }
    )


@app.route("/connect", methods=["GET"])
def connect():
    global game
    nick = session.get("nick", None)

    game[nick]["vx"] = float(request.args.get("vx"))
    game[nick]["vy"] = float(request.args.get("vy"))
    
    return jsonify({"result": "success", "game": game})


def server_setup():
    csrf = CSRFProtect()
    csrf.init_app(app)
    app.run("0.0.0.0", port=5500)

if __name__ == "__main__":
    t1 = threading.Thread(target=gamebox)
    t2 = threading.Thread(target=server_setup)
    t1.start()
    t2.start()
    t1.join()
    t2.join()
