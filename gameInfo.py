import math

maps = {
    "dorm": {
        "name": "숙소동 숙소",
        "imagePath": "/static/image/dorm.png",
        "width": 1,
        "height": 1,
        "loc": [(105, 130), (30, 130)],  # 숙소 입구 / 화장실 입구
        "walls": [
            {"x": -40, "y": 10, "width": 50, "height": 158},
            {"x": 125, "y": 10, "width": 50, "height": 158},
            {"x": 0, "y": 0, "width": 130, "height": 50},
            {"x": 0, "y": 170, "width": 130, "height": 10},
            {"x": 49, "y": 128, "width": 38, "height": 42},
            {"x": 49, "y": 50, "width": 38, "height": 37},
        ],
        "portals": [
            {
                "name": "숙소 -> 복도",
                "x": 90,
                "y": 150,
                "width": 30,
                "height": 10,
                "options": [
                    {"label": "1. 복도로 이동", "target": "dorm_hallway"},
                ],
            },
            {
                "name": "화장실 문",
                "x": 15,
                "y": 160,
                "width": 30,
                "height": 10,
                "options": [
                    {"label": "1. 화장실로 이동", "target": "toilet", "locNum": 0}
                ],
            },
        ],
        "npcs": [],
    },
    "dorm_hallway": {
        "name": "숙소동 복도",
        "imagePath": "/static/image/dorm_hallway.png",
        "width": 1.1,
        "height": 1.1,
        "loc": [(895, 95), (1520, 940) ],  # 숙소 앞 / 우측 교육동 -> 기숙사 복도 / 좌측 교육동 -> 기숙사
        "walls": [ {"x": 150, "y": 295, "width": 150, "height": 760},
                  {"x": 1300, "y": 295, "width": 150, "height": 760},
                  {"x": 300, "y": 190, "width": 1000, "height": 100},
                  {"x": 155, "y": 145, "width": 1300, "height": 45},
                  {"x": 5, "y": 1030, "width": 1600, "height": 20},
                  {"x": 5, "y": 47, "width": 5, "height": 1000},
                  {"x": 1595, "y": 47, "width": 5, "height": 1000},
                  {"x": 5, "y": 5, "width": 1590, "height": 40},
                  ],
        "portals": [
            {
                "name": "숙소 입구",
                "x": 880,
                "y": 40,
                "width": 30,
                "height": 10,
                "options": [
                    {
                        "label": "숙소로 이동",
                        "target": "dorm",
                        "locNum": 0,
                    },
                ],
            },
            {
                "name": "우측 기숙사 로비 -> 교육동 B1",
                "x": 1480,
                "y": 1010,
                "width": 70,
                "height": 10,
                "options": [
                    {
                        "label": "교육동 B1로 이동",
                        "target": "floor_b1",
                        "locNum": 4,
                    },
                ],
            },
            {
                "name": "좌측 기숙사 로비 -> 교육동 B1",
                "x": 45,
                "y": 1010,
                "width": 70,
                "height": 10,
                "options": [
                    {
                        "label": "교육동 B1로 이동",
                        "target": "floor_b1",
                        "locNum": 4,
                    },
                ],
            },
        ],
        "npcs": [],
    },
    "cafe": {
        "name": "교육동 B1F 카페",
        "imagePath": "/static/image/cafe.png",
        "width": 1,
        "height": 1,
        "loc": [(105, 180)],
        "walls": [
            {"x": 0, "y": 100, "width": 10, "height": 180},  # 왼쪽 벽
            {"x": 200, "y": 100, "width": 10, "height": 180},  # 오른쪽 벽
            {"x": 0, "y": 110, "width": 205, "height": 10},  # 위쪽 벽
            {"x": 0, "y": 280, "width": 205, "height": 10},  # 아랫쪽 벽
            {"x": 10, "y": 145, "width": 35, "height": 45},  # 상품들
            {"x": 10, "y": 225, "width": 35, "height": 45},
            {"x": 170, "y": 225, "width": 30, "height": 45},
            {"x": 170, "y": 145, "width": 30, "height": 45},
        ],
        "portals": [
            {
                "name": "카페->교육동 B1층 로비",
                "x": 48,
                "y": 250,
                "width": 120,
                "height": 30,
                "options": [
                    {
                        "label": "1. 교육동 B1층 로비로 이동",
                        "target": "floor_b1",
                        "locNum": 3,
                    },
                ],
            },
        ],
        "npcs": [{"name": "카페직원", "x": 90, "y": 60, "imagePath": "/static/image/npc.png", "questNum":2}],
    },
    "store": {
        "name": "교육동 B1F 편의점",
        "imagePath": "/static/image/store.png",
        "width": 1,
        "height": 1,
        "loc": [(50, 170)],
        "walls": [
            {"x": -10, "y": 10, "width": 20, "height": 190},  # 왼쪽 벽
            {"x": 175, "y": 10, "width": 20, "height": 190},  # 오른쪽 벽
            {"x": -10, "y": 10, "width": 205, "height": 50},  # 위쪽 벽(자판기)
            {"x": -10, "y": 210, "width": 205, "height": 20},  # 아랫쪽 벽
            {"x": 85, "y": 90, "width": 20, "height": 150},  # 가운데 물건들
            {"x": 120, "y": 150, "width": 30, "height": 30},
        ],
        "portals": [
            {
                "name": "편의점 입구",
                "x": 20,
                "y": 170,
                "width": 60,
                "height": 40,
                "options": [
                    {
                        "label": "교육동 B1층 로비로 이동",
                        "target": "floor_b1",
                        "locNum": 0,
                    },
                ],
            }
        ],
        "npcs": [
            {"name": "편의점 직원", "x": 120, "y": 150, "imagePath": "/static/image/npc.png", "questNum":1}
        ],
    },
    "floor_b1": {
        "name": "교육동 B1F 복도",
        "imagePath": "/static/image/floor_b1.png",
        "width": 1,
        "height": 1,
        "loc": [
            (900, 490),
            (1330, 490),
            (80, 80),
            (680, 490),
            (70, 520),
        ],  # 편의점 앞 / 좌측 엘리베이터 앞 / 우측 엘리베이터 앞 / 카페 앞 / 기숙사 입출구
        "walls": [
             {"x": 148, "y": 300, "width": 975, "height": 160}, 
             {"x": 1260, "y": 300, "width": 140, "height": 160}, 
             {"x": 5, "y": 5, "width": 150, "height": 35}, 
             {"x": 1120, "y": 340, "width": 140, "height": 10}, 
             {"x": 5, "y": 40, "width": 10, "height": 570}, 
             {"x": 5, "y": 590, "width": 1400, "height": 10}, 
             {"x": 1400, "y": 460, "width": 10, "height": 150}, 
             {"x": 145, "y": 40, "width": 10, "height": 260}, 
             {"x": 120, "y":150, "width":30, "height": 30},
        ],
        "portals": [
            {
                "name": "교육동 B1층 좌측 엘리베이터",
                "x": 40,
                "y": 40,
                "width": 70,
                "height": 20,
                "options": [
                    {"label": "1. 3층 교육장 로비로 이동", "target": "floor","locNum": 1},
                ],
            },
            {
                "name": "교육동 B1층 우측 엘리베이터",
                "x": 1290,
                "y": 455,
                "width": 70,
                "height": 20,
                "options": [
                    {
                        "label": "1. 3층 교육장 로비로 이동",
                        "target": "floor",
                        "locNum": 0,
                    },
                ],
            },
            {
                "name": "교육동 b1 -> 편의점 입구",
                "x": 875,
                "y": 455,
                "width": 70,
                "height": 15,
                "options": [
                    {"label": "1. 편의점으로 이동", "target": "store"},
                ],
            },
            {
                "name": "교육동 b1 -> 카페 입구",
                "x": 640,
                "y": 455,
                "width": 90,
                "height": 15,
                "options": [
                    {"label": "1. 카페로 이동", "target": "cafe"},
                ],
            },
            {
                "name": "교육동 b1 -> 기숙사 로비",
                "x": 5,
                "y": 495,
                "width": 20,
                "height": 60,
                "options": [
                    {
                        "label": "1. 기숙사 로비로 이동",
                        "target": "dorm_hallway",
                        "locNum": 1,
                    },
                ],
            },
        ],
        "npcs": [{"name": "현수 코치님", "x": 120, "y": 150, "imagePath": "/static/image/npc.png", "questNum":3}
        ],
    },
    "floor": {
        "name": "교육동 3F 복도",
        "imagePath": "/static/image/floor.png",
        "width": 1.7,
        "height": 1.7,
        "loc": [
            (380, 120),
            (230, 1185),
            (400, 715),
            (400, 890),
        ],  # 윗쪽 엘리베이터 앞 / 아랫쪽 엘리베이터 앞 / 교육실 윗쪽 / 교육실 아랫쪽
        "walls": [
            {"x": 10, "y": 30, "width": 310, "height": 190}, 
            {"x": 470, "y": 30, "width": 1050, "height": 190}, 
            {"x": 10, "y": 325, "width": 315, "height": 648}, 
            {"x": 10, "y": 1110, "width": 170, "height": 160}, 
            {"x": 315, "y": 1110, "width": 495, "height": 500},  #
            {"x": 185, "y": 1260, "width": 20, "height": 10}, 
            {"x": 275, "y": 1260, "width": 40, "height": 10}, 
            {"x": 10, "y": 970, "width": 10, "height": 200}, 
            {"x": 10, "y": 224, "width": 10, "height": 200}, 
            {"x": 324, "y": 70, "width": 160, "height": 10}, 
            {"x": 460, "y": 330, "width": 610, "height": 640}, 
            {"x": 1505, "y": 225, "width": 10, "height": 100}, 
            {"x": 1215, "y": 330, "width": 300, "height": 640}, 
            {"x": 810, "y": 1120, "width": 305, "height": 40}, 
            {"x": 1200, "y": 1120, "width":165, "height": 40}, 
            {"x": 1365, "y": 1110, "width":150, "height": 195}, 
            {"x": 1205, "y": 1260, "width":165, "height": 300},
            {"x": 810, "y": 1560, "width":400, "height": 50},
            {"x": 1140, "y": 1280, "width":5, "height": 300},
            {"x": 880, "y": 1345, "width":70, "height": 55},
            {"x": 990, "y": 1345, "width":70, "height": 55},
            {"x": 1225, "y": 1155, "width":140, "height": 55},
            {"x": 935, "y":230, "width":30, "height": 30},
        ],
        "portals": [
            {
                "name": "교육동 3층 아랫쪽 엘리베이터",
                "x": 205,
                "y": 1260,
                "width": 75,
                "height": 20,
                "options": [
                    {
                        "label": "1. 교육동 B1로 이동",
                        "target": "floor_b1",
                        "locNum": 2,
                    },
                ],
            },
            {
                "name": "교육동 3층 윗쪽 엘리베이터",
                "x": 315,
                "y": 100,
                "width": 20,
                "height": 80,
                "options": [
                    {
                        "label": "1. 교육동 B1로 이동",
                        "target": "floor_b1",
                        "locNum": 1,
                    },
                ],
            },
            {
                "name": "윗쪽 교육동 3층 -> 교육장 307호",
                "x": 320,
                "y": 715,
                "width": 10,
                "height": 30,
                "options": [
                    {
                        "label": "1. 교육장 307호로 이동",
                        "target": "classroom",
                        "locNum": 0,
                    },
                ],
            },
            {
                "name": "아랫쪽 교육동 3층 -> 교육장 307호",
                "x": 320,
                "y": 890,
                "width": 10,
                "height": 39,
                "options": [
                    {
                        "label": "1. 교육장 307호로 이동",
                        "target": "classroom",
                        "locNum": 1,
                    },
                ],
            },
        ],
        "npcs": [{"name": "예인코치님", "x":940, "y": 230, "imagePath": "/static/image/npc.png", "questNum":0}
        ],
    },
    "toilet": {
        "name": "숙소동 숙소 화장실",
        "imagePath": "/static/image/toilet.png",
        "width": 1,
        "height": 1,
        "loc": [(70, 60)],
        "walls": [
            {"x": 5, "y": 90, "width": 50, "height": 50}, 
            {"x": 5, "y": 10, "width": 50, "height": 50}, 
            {"x": 0, "y": 40, "width": 10, "height": 50},
            {"x": 130, "y": 40, "width": 10, "height": 120},
            {"x": 90, "y": 10, "width": 50, "height": 50},
            {"x": 50, "y": 125, "width": 100, "height": 10}, 
        ],
        "portals": [
            {
                "name": "화장실 문",
                "x": 56,
                "y": 25,
                "width": 30,
                "height": 10,
                "options": [
                    {"label": "1. 기숙사 방으로 이동", "target": "dorm", "locNum": 1},
                ],
            }
        ],
        "npcs": [],
    },
    "classroom": {
        "name": "교육동 3F 307호",
        "imagePath": "/static/image/classroom.png",
        "width": 1,
        "height": 1,
        "loc": [(370, 175), (370, 585)],  # 윗쪽 문 / 아랫쪽 문
        "walls": [
            {"x": -5, "y": 10, "width": 20, "height": 720},  # 왼쪽 벽
            {"x": 430, "y": 10, "width": 20, "height": 720},  # 오른쪽 벽
            {"x": -5, "y": 10, "width": 450, "height": 40},  # 윗쪽 벽
            {"x": -5, "y": 720, "width": 450, "height": 50},  # 아랫쪽 벽
            {"x": 20, "y": 50, "width": 30, "height": 30},  # 왼쪽 벽 물체
            {"x": 20, "y": 110, "width": 30, "height": 40},
            {"x": 20, "y": 220, "width": 30, "height": 40},
            {"x": 20, "y": 335, "width": 30, "height": 40},
            {"x": 20, "y": 450, "width": 30, "height": 40},
            {"x": 20, "y": 555, "width": 30, "height": 40},
            {"x": 20, "y": 620, "width": 15, "height": 40},
            {"x": 20, "y": 670, "width": 30, "height": 40},
            {"x": 400, "y": 50, "width": 30, "height": 40},  # 오른쪽 벽 물체
            {"x": 405, "y": 210, "width": 10, "height": 20},
            {"x": 405, "y": 650, "width": 30, "height": 40},
            {"x": 95, "y": 60, "width": 35, "height": 10},  # 왼쪽 벽 물체
            {"x": 205, "y": 60, "width": 35, "height": 10},
            {"x": 290, "y": 60, "width": 20, "height": 10},
            {"x": 330, "y": 60, "width": 20, "height": 10},
            {"x": 135, "y": 80, "width": 30, "height": 40},  # 중앙 컴퓨터 1번
            {"x": 135, "y": 310, "width": 30, "height": 40},
            {"x": 135, "y": 535, "width": 30, "height": 40},
            {"x": 245, "y": 80, "width": 40, "height": 40},
            {"x": 245, "y": 310, "width": 40, "height": 40},
            {"x": 245, "y": 535, "width": 40, "height": 40},
            {"x": 90, "y": 140, "width": 35, "height": 60},  # 중앙 컴퓨터 2번
            {"x": 90, "y": 370, "width": 35, "height": 55},
            {"x": 90, "y": 600, "width": 35, "height": 50},
            {"x": 285, "y": 145, "width": 35, "height": 50},
            {"x": 285, "y": 370, "width": 35, "height": 50},
            {"x": 285, "y": 590, "width": 35, "height": 60},
            {"x": 135, "y": 210, "width": 30, "height": 20},  # 중앙 컴퓨터 3번
            {"x": 245, "y": 210, "width": 30, "height": 20},
            {"x": 135, "y": 435, "width": 30, "height": 20},
            {"x": 245, "y": 435, "width": 30, "height": 20},
            {"x": 135, "y": 660, "width": 30, "height": 20},
            {"x": 245, "y": 660, "width": 30, "height": 20},
            {"x": 355, "y": 310, "width": 30, "height": 35},  # 데스크
            {"x": 355, "y": 370, "width": 30, "height": 55},
        ],
        "portals": [
            {
                "name": "교육실 307호 -> 교육장 윗쪽 로비",
                "x": 420,
                "y": 170,
                "width": 10,
                "height": 30,
                "options": [
                    {"label": "1. 교육장 로비로 이동", "target": "floor", "locNum": 2},
                ],
            },
            {
                "name": "교육실 307호 -> 교육장 아랫쪽 로비",
                "x": 420,
                "y": 580,
                "width": 10,
                "height": 30,
                "options": [
                    {"label": "1. 교육장 로비로 이동", "target": "floor", "locNum": 3},
                ],
            },
        ],
        "npcs": [],
    },
   }


quests = [
    {
        "_id": 0,
        "title": "교육의 시작📚",
        "description": "교육동 3층으로 가서 예인코치님께 말을 걸자.",
        "status": "not_started",
        "dialogue": [
            {"npc": "coach", "text": "크래프톤 정글캠퍼스에 오신 것을 환영합니다."},
            {
                "npc": "coach1",
                "text": "맵을 돌아다니면서 각 장소에 가서 NPC들과 대화를 나누고, 퀘스트를 진행해 보세요.",
            },
        ],
        "sell": None,
    },
    {
        "_id": 1,
        "title": "목이 마르네?",
        "description": "교육동 B1층 편의점에 가서 음료를 사서 마시자.",  # 음료 사서 소비하면 완료
        "status": "not_started",
        "dialogue": [
            {
                "npc": "shopkeeper",
                "text": "어서오세요. 24시간 편의점입니다. 필요한 것이 있으면 언제든 말씀해 주세요.",
            }
        ],
        "sell": "store",
    },
    {
        "_id": 2,
        "title": "배가 고프다!",
        "description": "편의점 바로 옆 카페에 가서 빵을 사보자.",
        "status": "not_started",
        "dialogue": [
            {
                "npc": "barista",
                "text": "어서오세요. 카페 그랩앤고입니다. 무엇을 도와드릴까요?",
            }
        ],
        "sell": "cafe",
    },
    {
        "_id": 3,
        "title": "다른 코치님을 만나볼까?",
        "description": "교육동 B1층 복도에서 현수코치님을 찾아보자.",
        "status": "not_started",
        "dialogue": [
            {
                "npc": "coach2",
                "text": "오늘은 이만 쉬는게 어때요?",
            }
        ],
        "sell": None,
    },
    {
        "_id": 4,
        "title": "이제 쉬어볼까?",
        "description": "숙소동으로 돌아가 내 방에 입장하자.",
        "status": "not_started",
        "dialogue": [
            {
                "npc": "player",
                "text": "잠이나 자야지!",
            }
        ],
        "sell": None,
    },
]

sales_items = [
    {
        "location": "store",
        "items": [
            {"_id": 0, "name": "삼다수", "price": 1000, "img": "Water.png"},
            {"_id": 1, "name": "코카콜라", "price": 1800},
            {"_id": 2, "name": "하겐다즈", "price": 17900}
        ]
        
    },
    {
        "location": "cafe",
        "items": [
            {"_id": 3, "name": "프레첼", "price": 2000}
        ]
    }
]

def isBlocked(x, y, w, h, map):
    for wall in maps[map]["walls"]:
        inX = x + w/2 > wall["x"] and x - w/2 < wall["x"] + wall["width"]
        inY = y + h/2 > wall["y"] and y < wall["y"] + wall["height"]
        
        if (inX and inY):
            return True
    return False

def nearPortal(x, y, w, h, map):
    for i, zone in enumerate(maps[map]["portals"]):
        inX = x + w / 2 > zone["x"] and x - w / 2 < zone["x"] + zone["width"]
        inY = y + h / 2 > zone["y"] + zone["height"]/2 and y < zone["y"] + zone["height"]
        if (inX and inY):
            return i
    return None

def nearNPC(x, y, map):
    for i, npc in enumerate(maps[map]["npcs"]):
        distance = math.sqrt((npc["x"] - x)**2 + (npc["y"] - y)**2)
        if (distance < 80):
            return i
    return None
