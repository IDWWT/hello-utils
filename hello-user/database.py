from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine("mysql+pymysql://local_user:user1234@hello-db:3306/hello_util?charset=utf8mb4")
db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
    from models import UserRole, UserMaster

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # Create the fixtures
    admin = UserRole(role_code="ADMIN", role_name="관리자", can_edit_post_yn="Y", can_delete_post_yn="Y")
    db_session.add(admin)
    normal = UserRole(role_code="NORMAL", role_name="일반 사용자", can_edit_post_yn="Y", can_delete_post_yn="N")
    db_session.add(normal)

    db_session.commit()
