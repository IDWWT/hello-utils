from graphene.test import Client
from schema import schema as my_schema
import inspect
import json


def users():
    try:
        client = Client(my_schema)
        response = client.execute('''
            query Users {
                users(first: 5) {
                    totalCount
                    edges {
                        node {
                            userId
                            userEmail
                            roleCode
                            socialId
                            createdAt
                            updatedAt
                            id
                        }
                    }
                    pageCursors {
                        around {
                            cursor
                            isCurrent
                            page
                        }
                        first {
                            cursor
                            isCurrent
                            page
                        }
                        last {
                            cursor
                            isCurrent
                            page
                        }
                        next {
                            cursor
                            isCurrent
                            page
                        }
                        previous {
                            cursor
                            isCurrent
                            page
                        }
                    }
                }
            }
        ''')
        users_data = response["data"]["users"]
        
        assert "totalCount" in users_data
        assert "edges" in users_data
        assert "pageCursors" in users_data
        print("\033[94m" + "test success : " + inspect.currentframe().f_code.co_name + "\033[0m")
    except:
        print("\033[91m" + "test failed : " + inspect.currentframe().f_code.co_name + "\033[0m")
        print("response :", json.dumps(response, indent=4))
        # print("expect :", json.dumps(expect, indent=4))
        exit(1)

def users_by_user_email():
    try:
        client = Client(my_schema)
        variables = {
            "userEmail": "Finnley@hotmail.com"
        }
        response = client.execute('''
            query Users($userEmail: String!) {
                users(first: 1, userEmail: $userEmail) {
                    totalCount
                    edges {
                        node {
                            userId
                            userEmail
                            roleCode
                            socialId
                            userRole {
                                roleCode
                                roleName
                                canEditPostYn
                                canDeletePostYn
                            }
                        }
                    }
                }
            }
        ''', None, None, variables)
        expect = {
            "data": {
                "users": {
                    "totalCount": 1,
                    "edges": [
                        {
                            "node": {
                                "userId": "2fc82b4f-42b1-49e7-8dc5-c2bb9f9c682e",
                                "userEmail": "Finnley@hotmail.com",
                                "roleCode": "NORMAL",
                                "socialId": None,
                                "userRole": {
                                    "roleCode": "NORMAL",
                                    "roleName": "일반 사용자",
                                    "canEditPostYn": "Y",
                                    "canDeletePostYn": "N"
                                }
                            }
                        }
                    ]
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
users_by_user_email()
mutate_user()
mutate_user_with_optional_data()
exit(0)