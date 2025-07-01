from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

uri = "mongodb+srv://khj:3DPYt5G4XljgvZlP@khj.wl2suic.mongodb.net/?retryWrites=true&w=majority&appName=khj&tlsAllowInvalidCertificates=true"
client = MongoClient(uri, 27017)  # MongoDB는 27017 포트로 돌아갑니다.
db = client.dbjungle

def init():
    lists = [{
        "_id":0,
        "title":"교육의 시작",
        "description":"교육동으로 가서 안내 NPC에게 말을 걸자.",
        "state":"not_started",
        "dialogue":[{
            "npc":"coach",
            "text":"크래프톤 정글캠퍼스에 오신 것을 환영합니다."
        },{
            "npc":"coach",
            "text":"맵을 돌아다니면서 각 장소에 가서 NPC들과 대화를 나누고, 퀘스트를 진행해 보세요."
        }]
    },{
        "_id":1,
        "title":"간식이 필요해",
        "description":"편의점에 가서 음료를 사보자.",
        "state":"not_started",
        "dialogue":[{
            "npc":"shopkeeper",
            "text":"어서오세요. 24시간 편의점입니다. 필요한 것이 있으면 언제든 말씀해 주세요."
        }]
    },{
        "_id":2,
        "title":"카페 투어",
        "description":"카페로 가서 빵을 사보자.",
        "state":"not_started",
        "dialogue":[{
            "npc":"barista",
            "text":"어서오세요. 카페 그랩앤고입니다. 무엇을 도와드릴까요?"
        }]
    },{
        "_id":3,
        "title":"이제 쉬자",
        "description":"숙소동으로 돌아가서 자신의 방에 입장하라.",
        "state":"not_started"
    }]
    for list in lists:
        db.quests.insert_one(list)

if __name__ == '__main__':
    db.quests.drop()
    init()