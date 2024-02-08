from operator import and_
from models import UserRole as UserRoleModel, UserMaster as UserMasterModel
import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from database import db_session
import uuid

class UserRole(SQLAlchemyObjectType):
    class Meta:
        model = UserRoleModel

class UserMaster(SQLAlchemyObjectType):
    class Meta:
        model = UserMasterModel

class UserMasterMutation(graphene.Mutation):
    class Arguments:
        user_email = graphene.String(required=True)
    
    user = graphene.Field(lambda: UserMaster)

    def mutate(self, info, user_email):
        user = db_session.query(UserMasterModel).filter_by(user_email=user_email).first()
        if user is None:
            user = UserMasterModel(user_id=uuid.uuid4(), user_email=user_email)
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
    )

    def resolve_users(self, info, user_id=None, user_email=None, role_code=None):
        query = UserMaster.get_query(info)

        if user_id: query = query.filter(UserMasterModel.user_id == user_id)
        if user_email: query = query.filter(UserMasterModel.user_email == user_email)
        if role_code: query = query.filter(UserMasterModel.role_code == role_code)

        return query.all()

class Mutation(graphene.ObjectType):
    mutate_user = UserMasterMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
