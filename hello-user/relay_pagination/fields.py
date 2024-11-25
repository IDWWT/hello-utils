from graphene import Boolean, Field, Int, List, ObjectType, String
from graphene.relay import Connection
from graphene_sqlalchemy import SQLAlchemyConnectionField

from .helpers import convert_connection_args_to_page_options
from .pagination import create_page_cursors


class PageCursor(ObjectType):
    cursor = String()
    is_current = Boolean()
    page = Int()


class PageCursors(ObjectType):
    around = List(PageCursor)
    first = Field(PageCursor)
    last = Field(PageCursor)
    next = Field(PageCursor)
    previous = Field(PageCursor)


class PageConnection(Connection):
    class Meta:
        abstract = True

    page_cursors = Field(PageCursors)

    total_count = Int()
    def resolve_total_count(root, info, **kwargs):
        return root.length


class PageConnectionField(SQLAlchemyConnectionField):
    @classmethod
    def resolve_connection(cls, connection_type, model, info, args, resolved):
        connection = super(PageConnectionField, cls).resolve_connection(
            connection_type, model, info, args, resolved
        )

        page_options = convert_connection_args_to_page_options(args)
        page_cursors = create_page_cursors(page_options, connection.length)
        connection.page_cursors = page_cursors

        return connection

    RELAY_ARGS = ['first', 'last', 'before', 'after']
    @classmethod
    def get_query(cls, model, info, **kwargs):
        query = super(PageConnectionField, cls).get_query(model, info, **kwargs)
        for field, value in kwargs.items():
            if field not in cls.RELAY_ARGS:
                query = query.filter(getattr(model, field) == value)
        return query