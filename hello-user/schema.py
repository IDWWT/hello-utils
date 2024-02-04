from models import UserRole as UserRoleModel, UserMaster as UserMasterModel
from graphene import Connection, Int

import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType

class ExtendedConnection(Connection):
    class Meta:
        abstract = True

    total_count = Int()
    edge_count = Int()

    def resolve_total_count(root, info, **kwargs):
        return root.length
    def resolve_edge_count(root, info, **kwargs):
        return len(root.edges)

class UserRole(SQLAlchemyObjectType):
    class Meta:
        model = UserRoleModel
        interfaces = (relay.Node,)

class UserMaster(SQLAlchemyObjectType):
    class Meta:
        model = UserMasterModel
        interfaces = (relay.Node,)
        connection_class = ExtendedConnection

class Query(graphene.ObjectType):
    node = relay.Node.Field()

    user_role = SQLAlchemyConnectionField(UserRole.connection)
    user_master = SQLAlchemyConnectionField(UserMaster.connection)


schema = graphene.Schema(query=Query)
