from operator import and_
from models import UserRole as UserRoleModel, UserMaster as UserMasterModel
import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from database import db_session

class UserRole(SQLAlchemyObjectType):
    # 내부 클래스로서, 모델과 GraphQL 객체 사이의 매핑 및 추가 설정을 정의하는 데 사용
    class Meta:
        model = UserRoleModel

class UserMaster(SQLAlchemyObjectType):
    class Meta:
        model = UserMasterModel

class UserMasterMutation(graphene.Mutation):
    # GraphQL Mutation의 입력 파라미터를 정의하는데 사용
    class Arguments:
        user_email = graphene.String(required=True)
        social_id = graphene.String(required=False)
    
    # GraphQL 쿼리에서 반환될 데이터의 타입과 구조를 결정
    user = graphene.Field(UserMaster)

    def mutate(self, info, user_email, social_id=None):
        user = db_session.query(UserMasterModel).filter_by(user_email=user_email).first()
        if user is None:
            user = UserMasterModel(user_email=user_email, social_id=social_id)
            user.save()
        else:
            raise Exception('Email already exists')

        return UserMasterMutation(user=user)

class Query(graphene.ObjectType):
    users = graphene.List(
        UserMaster,
        user_id=graphene.String(required=False),
        user_email=graphene.String(required=False),
        role_code=graphene.String(required=False),
        sort_by=graphene.String(required=False),
        sort_order=graphene.String(required=False),
    )

    def resolve_users(self, info, **kwargs):
        # info: GraphQL의 실행 컨텍스트와 쿼리 정보에 접근하고 제어하는 데 사용
        query = UserMaster.get_query(info)

        if kwargs.get("user_id"):
            query = query.filter(UserMasterModel.user_id == kwargs.get("user_id"))

        if kwargs.get("user_email"):
            query = query.filter(UserMasterModel.user_email == kwargs.get("user_email"))

        if kwargs.get("role_code"):
            query = query.filter(UserMasterModel.role_code == kwargs.get("role_code"))
        
        # 정렬
        if kwargs.get("sort_by"):
            sort_by = kwargs.get("sort_by")
            sort_order = kwargs.get("sort_order", "asc")  # 기본적으로 오름차순
            if sort_order == "asc":
                query = query.order_by(getattr(UserMasterModel, sort_by).asc())
            elif sort_order == "desc":
                query = query.order_by(getattr(UserMasterModel, sort_by).desc())


        return query.all()


class Mutation(graphene.ObjectType):
    mutate_user = UserMasterMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
