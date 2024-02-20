from graphene.test import Client
from schema import schema as my_schema
from database import db_session, init_db
from models import UserRole, UserMaster
import uuid
import inspect
import json

# 스키마 초기화
init_db()

user_id_01, user_id_02 = uuid.uuid4(), uuid.uuid4()
normal_user_01 = UserMaster(user_id=user_id_01, user_email='normal_user_01@hello.com')
normal_user_02 = UserMaster(user_id=user_id_02, user_email='normal_user_02@hello.com')
db_session.add_all([normal_user_01, normal_user_02])
db_session.commit()

def users():
    try:
        client = Client(my_schema)
        response = client.execute('''query Users {
            users (sortBy: "user_email") {
                userId
                userEmail
            }
        }''')
        expect = {
            "data": {
                "users": [
                    {
                        "userId": f"{user_id_01}",
                        "userEmail": "normal_user_01@hello.com"
                    },
                    {
                        "userId": f"{user_id_02}",
                        "userEmail": "normal_user_02@hello.co"
                    }
                ]
            }
        }
        assert response == expect
        print("\033[94m" + "test success : " + inspect.currentframe().f_code.co_name + "\033[0m")
    except:
        print("\033[91m" + "test failed : " + inspect.currentframe().f_code.co_name + "\033[0m")
        print("response :", json.dumps(response, indent=4))
        print("expect :", json.dumps(expect, indent=4))
        exit(1)

def mutate_user():
    try:
        client = Client(my_schema)
        variables = {
            "userEmail": "test_user01@gmail.com"
        }
        response = client.execute('''mutation MutateUser($userEmail: String!) {
            mutateUser(userEmail: $userEmail) {
                user {
                    # userId 랜덤으로 생성되기 때문에 검증 불가
                    userEmail
                    roleCode
                    socialId
                }
            }
        }''', None, None, variables)
        expect = {
            "data": {
                "mutateUser": {
                    "user": {
                        # "userId": "d37868e4-5533-47d5-b9dc-6fb7589e338a",
                        "userEmail": "test_user01@gmail.com",
                        "roleCode": "NORMAL",
                        "socialId": None,
                    }
                }
            }
        }
        assert response == expect
        print("\033[94m" + "test success : " + inspect.currentframe().f_code.co_name + "\033[0m")
    except:
        print("\033[91m" + "test failed : " + inspect.currentframe().f_code.co_name + "\033[0m")
        print("response :", json.dumps(response, indent=4))
        print("expect :", json.dumps(expect, indent=4))
        exit(1)

def mutate_user_with_optional_data():
    try:
        client = Client(my_schema)
        variables = {
            "userEmail": "test_user02@gmail.com",
            "socialId": "142356679"
        }
        response = client.execute('''mutation MutateUser($userEmail: String!, $socialId: String) {
            mutateUser(userEmail: $userEmail, socialId: $socialId) {
                user {
                    # userId 랜덤으로 생성되기 때문에 검증 불가
                    userEmail
                    roleCode
                    socialId
                }
            }
        }''', None, None, variables)
        expect = {
            "data": {
                "mutateUser": {
                    "user": {
                        # "userId": "d37868e4-5533-47d5-b9dc-6fb7589e338a",
                        "userEmail": "test_user02@gmail.com",
                        "roleCode": "NORMAL",
                        "socialId": "142356679",
                    }
                }
            }
        }
        assert response == expect
        print("\033[94m" + "test success : " + inspect.currentframe().f_code.co_name + "\033[0m")
    except:
        print("\033[91m" + "test failed : " + inspect.currentframe().f_code.co_name + "\033[0m")
        print("response :", json.dumps(response, indent=4))
        print("expect :", json.dumps(expect, indent=4))
        exit(1)


users()
mutate_user()
mutate_user_with_optional_data()
exit(0)