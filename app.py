from fastapi import FastAPI
from server.routes.users import user

app = FastAPI()

app.include_router(user)