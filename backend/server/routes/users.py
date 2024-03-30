from fastapi import APIRouter, HTTPException

from server.controllers.users import (
    index_user,
    list_users,
    create_user,
    replace_user,
    destroy_user,
)
from server.models.user import User, UpdateUser

user = APIRouter()


@user.get("/users/{id}", response_model=User)
async def get_user(id: str):
    response = await index_user(id)
    if response:
        return response
    raise HTTPException(404, f"There is no user with the id {id}")


@user.get("/users")
async def get_users():
    response = await list_users()
    return response


@user.post("/users", response_model=User)
async def post_user(user: User):
    response = await create_user(user.model_dump())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")


@user.put("/users/{id}", response_model=User)
async def put_user(id: str, data: UpdateUser):
    response = await replace_user(id, data)
    if response:
        return response
    raise HTTPException(404, f"There is no user with the id {id}")


@user.delete("/users/{id}")
async def delete_user(id: str):
    response = await destroy_user(id)
    if response:
        return "Successfully deleted user"
    raise HTTPException(404, f"There is no user with the id {id}")
