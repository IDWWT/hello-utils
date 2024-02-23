from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from db_data.product import init_user_role, init_user_master
from db_data.develop import init_user_master_dev
import os

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

    init_user_role(db_session)
    init_user_master(db_session)

    if (os.environ['DOPPLER_CONFIG'] == 'dev'):
        init_user_master_dev(db_session)


    db_session.commit()
