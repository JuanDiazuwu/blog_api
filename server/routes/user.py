from passlib.hash import sha256_crypt
from bson import ObjectId
from fastapi import APIRouter, Response, status
from starlette.status import HTTP_204_NO_CONTENT
from pymongo import ReturnDocument

from server.config.db import connection
from server.schemas.user import userEntity, usersEntity
from server.models.user import User

user = APIRouter()

@user.post('/users', response_model=User, tags=['users'])
def create_user(user:User):
    new_user = dict(user)
    new_user["password"] = sha256_crypt.encrypt(new_user["password"])
    del new_user["id"]

    id = connection.my_blog_db.users.insert_one(new_user).inserted_id
    user = connection.my_blog_db.users.find_one({"_id":id})
    return userEntity(user)

@user.get('/users', response_model=list[User], tags=['users'])
def find_all_user():
    return usersEntity(connection.my_blog_db.users.find())

@user.get('/users/{id}', response_model=User, tags=['users'])
def find_user(id:str):
    return userEntity(connection.my_blog_db.users.find_one({"_id":ObjectId(id)}))

@user.put('/users/{id}', response_model=User, tags=['users'])
async def update_user(id:str, user:User):
    connection.my_blog_db.users.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": user.model_dump()},
        return_document=ReturnDocument.AFTER
    )
    return(find_user(id))

@user.delete('/users/{id}', status_code=status.HTTP_204_NO_CONTENT, tags=['users'])
def find_all_users(id:str):
    userEntity(connection.my_blog_db.users.find_one_and_delete({"_id":ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)