from fastapi import FastAPI
from server.routes.users import user
from server.routes.comments import comment
from server.routes.tags import tag
from server.routes.categories import category
from fastapi.middleware.cors import CORSMiddleware

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
app.include_router(comment)
app.include_router(tag)
app.include_router(category)