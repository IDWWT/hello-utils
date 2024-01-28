from datetime import datetime
from user import User

class NormalUser(User):
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
        assert role_code == 'NORMAL', f"role_code: {role_code} is invalid"

        super().__init__(user_id, user_email, provider, role_code, created_at, social_id, access_token, refresh_token, expires_at, updated_at)
    
    def grant_admin_role(self):
        self.role_code = 'ADMIN'