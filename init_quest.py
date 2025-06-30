from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

uri = "mongodb+srv://khj:3DPYt5G4XljgvZlP@khj.wl2suic.mongodb.net/?retryWrites=true&w=majority&appName=khj&tlsAllowInvalidCertificates=true"
client = MongoClient(uri, 27017)  # MongoDB는 27017 포트로 돌아갑니다.
db = client.dbjungle

def init():
    lists = [{
        "_id":0,
        "name":"교육의 시작",
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

    }]
    for list in lists:
        db.quests.insert_one(list)

if __name__ == '__main__':
    db.quests.drop()
    init()