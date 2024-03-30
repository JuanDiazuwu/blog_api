# from decouple import config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.routes.users import user
from server.routes.tags import tag
from server.routes.categories import category
from server.routes.comments import comment
from server.routes.publications import publication

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user)
app.include_router(tag)
app.include_router(category)
app.include_router(comment)
app.include_router(publication)
