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
    users = graphene.List(UserMaster, user_email=graphene.String(required=False))

    def resolve_users(self, info, user_email=None):
        query = UserMaster.get_query(info)

        if user_email:
            query = query.filter(UserMasterModel.user_email == user_email)

        return query.all()


schema = graphene.Schema(query=Query)
