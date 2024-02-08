import enum
from database import Base
from sqlalchemy import Column, DateTime, ForeignKey, String, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import backref, relationship

class YN(enum.Enum):
    Y = 'Y'
    N = 'N'

SA_YN = Enum(YN)

class UserRole(Base):
    __tablename__ = "user_role"
    role_code = Column(String(30), primary_key=True)
    role_name = Column(String(50), nullable=False)
    can_edit_post_yn = Column(SA_YN, nullable=False)
    can_delete_post_yn = Column(SA_YN, nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now())

class UserMaster(Base):
    __tablename__ = "user_master"
    user_id = Column(String(36), primary_key=True)
    user_email = Column(String(320), nullable=False, unique=True)
    role_code = Column(String(30), ForeignKey("user_role.role_code"), nullable=False, default="NORMAL")
    social_id = Column(String(255))
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now())
    user_role = relationship(
        UserRole, backref=backref("user_role", uselist=True, cascade="save-update")
    )