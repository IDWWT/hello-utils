from operator import and_
from models import UserMaster as UserMasterModel
import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from database import db_session
from relay_pagination.fields import PageConnection, PageConnectionField

class UserMaster(SQLAlchemyObjectType):
    class Meta:
        model = UserMasterModel
        interfaces = (graphene.relay.Node,)
        connection_class = PageConnection

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
    users = PageConnectionField(
        UserMaster,
        user_id=graphene.String(),
        user_email=graphene.String(),
        role_code=graphene.String(),
        social_id=graphene.String(),
    )


class Mutation(graphene.ObjectType):
    mutate_user = UserMasterMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
