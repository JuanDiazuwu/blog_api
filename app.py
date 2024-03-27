from fastapi import FastAPI
from server.routes.users import user
from server.routes.comments import comment
from server.routes.tags import tag

app = FastAPI()

app.include_router(user)
app.include_router(comment)
app.include_router(tag)