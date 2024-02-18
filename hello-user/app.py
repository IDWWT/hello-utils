from database import db_session, init_db
from flask import Flask
from flask_cors import CORS
from schema import schema
from flask_graphql import GraphQLView

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/health")
def health():
    try:
        is_db_healthy = db_session.execute("SELECT 1 AS healthy FROM DUAL").fetchone()["healthy"];
        response = { "healthy": is_db_healthy };
    except:
        response = { "healthy": 0 };
    return response

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True  # for having the GraphiQL interface
    )
)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == "__main__":
    init_db()
    app.run(host='0.0.0.0', debug=True)
