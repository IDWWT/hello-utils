from datetime import datetime
import uuid
import re

class User:
    def __init__(self
        , user_id: str
        , user_email: str
        , provider: str
        , role_code: str
        , created_at: datetime
        , social_id: str = None
        , access_token: str = None
        , refresh_token: str = None
        , expires_at: datetime = None
        , updated_at: datetime = None
    ):
        assert len(user_id) == 36, f"user_id: {user_id} is invalid"
        assert User.is_valid_email(user_email), f"user_email: {user_email} is invalid"
        
        self.__user_id = user_id
        self.__user_email = user_email
        self.__provider = provider
        self.__role_code = role_code
        self.__social_id = social_id
        self.__access_token = access_token
        self.__refresh_token = refresh_token
        self.__expires_at = expires_at
        self.__created_at = created_at
        self.__updated_at = updated_at
        
    @property
    def user_id(self):
        return self.__user_id

    # 변경 불가한 값
    # @user_id.setter
    # def user_id(self, value):
    #     self.__user_id = value

    @property
    def user_email(self):
        return self.__user_email

    @user_email.setter
    def user_email(self, value):
        self.__user_email = value

    @property
    def provider(self):
        return self.__provider

    @provider.setter
    def provider(self, value):
        self.__provider = value

    @property
    def role_code(self):
        return self.__role_code

    @role_code.setter
    def role_code(self, value):
        self.__role_code = value
        
    @property
    def created_at(self):
        return self.__created_at

    # 변경 불가한 값
    # @created_at.setter
    # def created_at(self, value):
    #     self.__created_at = value

    @property
    def social_id(self):
        return self.__social_id

    @social_id.setter
    def social_id(self, value):
        self.__social_id = value

    @property
    def access_token(self):
        return self.__access_token

    @access_token.setter
    def access_token(self, value):
        self.__access_token = value

    @property
    def refresh_token(self):
        return self.__refresh_token

    @refresh_token.setter
    def refresh_token(self, value):
        self.__refresh_token = value

    @property
    def expires_at(self):
        return self.__expires_at

    @expires_at.setter
    def expires_at(self, value):
        self.__expires_at = value

    @property
    def updated_at(self):
        return self.__updated_at

    @updated_at.setter
    def updated_at(self, value):
        self.__updated_at = value
    
    @staticmethod
    def create_user_id():
        return str(uuid.uuid4())

    @staticmethod
    def is_valid_email(email):
        # 이메일 형식을 정의하는 정규표현식
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

        match = re.match(email_pattern, email)
        return bool(match)

    def __repr__(self):
        return f"{self.__class__.__name__}('{self.user_id}', '{self.user_email}', '{self.provider}', '{self.role_code}', '{self.created_at}', '{self.social_id}', '{self.access_token}', '{self.refresh_token}', '{self.expires_at}', '{self.updated_at}')"