from operator import and_
from models import UserMaster as UserMasterModel, UserRole as UserRoleModel
import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from database import db_session
from relay_pagination.fields import PageConnection, PageConnectionField


class UserRole(SQLAlchemyObjectType):
    # 내부 클래스로서, 모델과 GraphQL 객체 사이의 매핑 및 추가 설정을 정의하는 데 사용
    class Meta:
        model = UserRoleModel

class UserMaster(SQLAlchemyObjectType):
    class Meta:
        model = UserMasterModel

class UserMasteRelay(SQLAlchemyObjectType):
    class Meta:
        model = UserMasterModel
        interfaces = (graphene.relay.Node,)
        connection_class = PageConnection

    user_role = graphene.Field(UserRole)

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
    # API 호출 권한 없이 개방, 상세한 필터링은 제공하지 않도록 함
    users = graphene.List(
        UserMaster,
        user_email=graphene.String(required=True),
    )

    def resolve_users(self, info, **kwargs):
        # info: GraphQL의 실행 컨텍스트와 쿼리 정보에 접근하고 제어하는 데 사용
        query = UserMaster.get_query(info)

        if kwargs.get("user_email"):
            query = query.filter(UserMasterModel.user_email == kwargs.get("user_email"))

        return query.all()

    users_relay = PageConnectionField(
        UserMasteRelay,
        user_id=graphene.String(),
        user_email=graphene.String(),
        role_code=graphene.String(),
        social_id=graphene.String(),
    )


class Mutation(graphene.ObjectType):
    mutate_user = UserMasterMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
