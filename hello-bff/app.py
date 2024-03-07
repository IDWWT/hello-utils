from flask import Flask, request
from flask_cors import CORS
import requests
import json
import os
from redis import Redis
from ast import literal_eval
from utils.graphql import get_root_field_name

app = Flask(__name__)
CORS(app)

REDIS_HOST = os.environ['REDIS_HOST']
REDIS_PORT = os.environ['REDIS_PORT']
HELLO_CODE_API_URL = os.environ['HELLO_CODE_API_URL']
HELLO_USER_API_URL = os.environ['HELLO_USER_API_URL']

redisClient = Redis.from_url(f'redis://{REDIS_HOST}:{REDIS_PORT}')

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/graphql", methods=["GET", "POST"])
def user():
    headers = {'Content-Type': 'application/json'}

    graphql_data = literal_eval(request.data.decode('utf-8'))
    graphql_query = graphql_data.get('query')
    root_field_name = get_root_field_name(graphql_query)

    # print(request.headers);
    x_user_id = request.headers.get("X-User-Id")
    x_access_token = request.headers.get("X-User-Token")
    # print(x_user_id, flush=True);
    # print(x_access_token, flush=True);
    
    user_session = redisClient.get(f"user_session_{x_user_id}")
    # print(user_session, flush=True);

    # request.get_json() 사용시 에러 발생: {'errors': [{'message': 'POST body sent invalid JSON.'}]}
    response = requests.post(f"{HELLO_USER_API_URL}/graphql", data=request.data, headers=headers)

    if response.status_code == 200:
        return response.json(), 200
    else:
        return "ERROR", 500

    # 예시
    # if request.method == "GET":
    #     board_response = requests.get(f"{HELLO_USER_API_URL}/graphql")
    #     if board_response.status_code == 200:
    #         return board_response.json(), 200
    #     else:
    #         return "ERROR", 500
    # elif request.method == "POST":
    #     requests.post("http://be-logger:8080/board/log", json.dumps({ "logContent" : json.dumps(request.get_json()) }), headers={ "Content-Type": "application/json" })
    #     board_response = requests.post("http://be-board:4000/board", request.get_json())
    #     if board_response.status_code == 200:
    #         return board_response.json(), 200
    #     else:
    #         return "ERROR", 500

# @app.route("/board/<int:id>", methods=["GET", "PUT", "DELETE"])
# def boardDetail(id):
#     if request.method == "GET":
#         board_response = requests.get(f"http://be-board:4000/board/{id}")
#         if board_response.status_code == 200:
#             return board_response.json(), 200
#         else:
#             return "ERROR", 500
#     elif request.method == "PUT":
#         board_response = requests.put(f"http://be-board:4000/board/{id}", request.get_json())
#         print(board_response.text)
#         if board_response.status_code == 200:
#             return board_response.json(), 200
#         else:
#             return "ERROR", 500
#     elif request.method == "DELETE":
#         board_response = requests.delete(f"http://be-board:4000/board/{id}")
#         print(board_response.text)
#         if board_response.status_code == 200:
#             return board_response.json(), 200
#         else:
#             return "ERROR", 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)