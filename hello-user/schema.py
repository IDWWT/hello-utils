from operator import and_
from models import UserRole as UserRoleModel, UserMaster as UserMasterModel
import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

class UserRole(SQLAlchemyObjectType):
    class Meta:
        model = UserRoleModel

class UserMaster(SQLAlchemyObjectType):
    class Meta:
        model = UserMasterModel
    
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


schema = graphene.Schema(query=Query)
