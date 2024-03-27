from bson import ObjectId
from fastapi import APIRouter, Response, status, HTTPException
from starlette.status import HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from pymongo import ReturnDocument

from server.config.db import connection
from server.schemas.comments import commentEntity,commentsEntity
from server.models.comment import Comment

comment = APIRouter()

@comment.post('/comments', response_model=Comment, tags=['comments'])
def create_comment(comment : Comment):
    new_comment = dict(comment)
    id = connection.my_blog_db.comments.insert_one(new_comment).inserted_id
    comment = connection.my_blog_db.comments.find_one({"_id":id})
    return commentEntity(comment)

@comment.get('/comments', response_model=list[Comment], tags=['comments'])
def find_all_comment():
    return commentsEntity(connection.my_blog_db.comments.find())

@comment.get('/comments/{id}', response_model=Comment, tags=['comments'])
def find_comment(id:str):
    return commentEntity(connection.my_blog_db.comments.find_one({"_id":ObjectId(id)}))

@comment.put('/comments/{id}', response_model=Comment, tags=['comments'])
async def update_user(id:str, comment:Comment):
    connection.my_blog_db.comments.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": comment.model_dump()},
        return_document=ReturnDocument.AFTER
    )
    return(find_comment(id))

@comment.delete('/comments/{id}', status_code=status.HTTP_204_NO_CONTENT, tags=['comments'])
def comment_delete(id:str):
    commentEntity(connection.my_blog_db.comments.find_one_and_delete({"_id":ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)