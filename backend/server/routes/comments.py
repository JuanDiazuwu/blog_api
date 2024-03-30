from fastapi import APIRouter, HTTPException

from server.controllers.comments import (
    index_comment, list_comments, create_comment, 
    replace_comment, destroy_comment
)
from server.models.comment import Comment, UpdateComment

comment = APIRouter()

@comment.get('/comments/{id}', response_model=Comment)
async def get_comment(id:str):
    response = await index_comment(id)
    if response:
        return response
    raise HTTPException(404, f"There is no comment with the id {id}")

@comment.get('/comments')
async def get_comments():
    response = await list_comments()
    return response

@comment.post('/comments', response_model=Comment)
async def post_comment(comment:Comment):
    response = await create_comment(comment.model_dump())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@comment.put('/comments/{id}', response_model=Comment)
async def put_comment(id:str, data:UpdateComment):
    response = await replace_comment(id, data)
    if response:
        return response
    raise HTTPException(404, f"There is no comment with the id {id}")

@comment.delete('/comments/{id}')
async def delete_comment(id:str):
    response = await destroy_comment(id)
    if response:
        return "Successfully deleted comment"
    raise HTTPException(404, f"There is no comment with the id {id}")