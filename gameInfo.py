maps = {
    "dorm": {
        "name": "dorm",
        "imagePath": "/static/image/dorm.png",
        "loc": [(105, 130), (30, 130)],
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
                "name": "숙소 엘리베이터",
                "x": 90,
                "y": 160,
                "width": 30,
                "height": 10,
                "options": [
                    {"label": "1. 카페로 이동", "target": "cafe"},
                    {"label": "2. 편의점으로 이동", "target": "store"},
                    {"label": "3. 교육실로 이동", "target": "classroom"},
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
    "cafe": {
        "name": "cafe",
        "imagePath": "/static/image/cafe.png",
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
                "name": "카페 엘리베이터",
                "x": 48,
                "y": 250,
                "width": 120,
                "height": 30,
                "options": [
                    {"label": "1. 기숙사로 이동", "target": "dorm"},
                    {"label": "2. 편의점으로 이동", "target": "store"},
                    {"label": "3. 교육실로 이동", "target": "classroom"},
                ],
            }
        ],
        "npcs": [],
    },
    "store": {
        "name": "store",
        "imagePath": "/static/image/store.png",
        "loc": [(50, 170)],
        "walls": [
            {"x": -10, "y": 10, "width": 20, "height": 190},  # 왼쪽 벽
            {"x": 175, "y": 10, "width": 20, "height": 190},  # 오른쪽 벽
            {"x": -10, "y": 10, "width": 205, "height": 50},  # 위쪽 벽(자판기)
            {"x": -10, "y": 210, "width": 205, "height": 20},  # 아랫쪽 벽
            {"x": 85, "y": 90, "width": 20, "height": 150},  # 가운데 물건들
        ],
        "portals": [
            {
                "name": "편의점 엘리베이터",
                "x": 20,
                "y": 170,
                "width": 60,
                "height": 40,
                "options": [
                    {"label": "1. 카페로 이동", "target": "cafe"},
                    {"label": "2. 기숙사로 이동", "target": "dorm"},
                    {"label": "3. 교육실로 이동", "target": "classroom"},
                ],
            }
        ],
        "npcs": [
            {"name": "상점", "x": 120, "y": 150, "imagePath": "/static/image/npc.png"}
        ],
    },
    "toilet": {
        "name": "toilet",
        "imagePath": "/static/image/toilet.png",
        "loc": [(70, 60)],
        "walls": [],
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
        "name": "classroom",
        "imagePath": "/static/image/classroom.png",
        "loc": [(205, 370)],
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
                "name": "교육실 엘리베이터",
                "x": 390,
                "y": 170,
                "width": 40,
                "height": 20,
                "options": [
                    {"label": "1. 카페로 이동", "target": "cafe"},
                    {"label": "2. 기숙사로 이동", "target": "dorm"},
                    {"label": "3. 편의점으로 이동", "target": "store"},
                ],
            },
            {
                "name": "교육실 엘리베이터",
                "x": 390,
                "y": 580,
                "width": 40,
                "height": 20,
                "options": [
                    {"label": "1. 카페로 이동", "target": "cafe"},
                    {"label": "2. 기숙사로 이동", "target": "dorm"},
                    {"label": "3. 편의점으로 이동", "target": "store"},
                ],
            },
        ],
        "npcs": [],
    },
}


quests = [
    {
        "_id": 0,
        "title": "교육의 시작",
        "description": "교육동으로 가서 안내 NPC에게 말을 걸자.",
        "state": "not_started",
        "dialogue": [
            {"npc": "coach", "text": "크래프톤 정글캠퍼스에 오신 것을 환영합니다."},
            {
                "npc": "coach",
                "text": "맵을 돌아다니면서 각 장소에 가서 NPC들과 대화를 나누고, 퀘스트를 진행해 보세요.",
            },
        ],
    },
    {
        "_id": 1,
        "title": "간식이 필요해",
        "description": "편의점에 가서 음료를 사보자.",
        "state": "not_started",
        "dialogue": [
            {
                "npc": "shopkeeper",
                "text": "어서오세요. 24시간 편의점입니다. 필요한 것이 있으면 언제든 말씀해 주세요.",
            }
        ],
    },
    {
        "_id": 2,
        "title": "카페 투어",
        "description": "카페로 가서 빵을 사보자.",
        "state": "not_started",
        "dialogue": [
            {
                "npc": "barista",
                "text": "어서오세요. 카페 그랩앤고입니다. 무엇을 도와드릴까요?",
            }
        ],
    },
    {
        "_id": 3,
        "title": "이제 쉬자",
        "description": "숙소동으로 돌아가서 자신의 방에 입장하라.",
        "state": "not_started",
    },
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
