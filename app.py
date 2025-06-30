from flask import Flask, render_template, request, jsonify, session, redirect
from flask_wtf.csrf import CSRFProtect
import hashlib
from pymongo import MongoClient


uri = "mongodb+srv://khj:3DPYt5G4XljgvZlP@khj.wl2suic.mongodb.net/?retryWrites=true&w=majority&appName=khj&tlsAllowInvalidCertificates=true"
client = MongoClient(uri, 27017)
db = client.dbjungle  # 'dbjungle'라는 이름의 db를 만듭니다.


app = Flask(__name__, static_folder="./static")
app.secret_key = "junglemetacampus"

@app.route("/")
def home():
    nickname = session.get("nickname", None)
    return render_template("login.html")

@app.route("/index")
def play():
    return render_template("index.html")

@app.route("/join", methods=["POST"])  # 포스트 메소드 둘다 사용
def register_or_login(): 
    nickname = request.form.get("nick")
    password = request.form.get("pw")
    pw_hash = hashlib.sha256(password.encode('utf-8')).hexdigest() # 비밀번호는 반드시 hash기술로 암호화 후 mongodb에 저장해야함
    
    user = db.users.find_one({"nickname": nickname})
    if user:
        if (pw_hash == user["password"]) :
            session["nick"] = nickname
            return jsonify({"result": "success", "action": "login", "msg": "로그인 성공"})
        else :
            return jsonify({"result": "fail", "err": "Wrong password"})
    else :
        db.users.insert_one({
            'nickname': nickname,
            'password': pw_hash
        })
        session["nick"] = nickname
        return jsonify({"result": "success", "action": "join", "msg": "회원가입 및 로그인 성공"})

@app.route("/loading")
def loading():
    global game, GameTimer
    #게임 리소스 로드 api

def server_setup():
    csrf = CSRFProtect()
    csrf.init_app(app)
    app.run("0.0.0.0", port=7141)

if __name__ == "__main__":
    app.run('0.0.0.0', port=5000, debug=True)
    # server_setup()