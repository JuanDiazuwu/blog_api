from bson import ObjectId
from fastapi import APIRouter, Response, status
from starlette.status import HTTP_204_NO_CONTENT
from pymongo import ReturnDocument

from server.config.db import connection
from server.schemas.tags import tag_entity, tags_entity
from server.models.tag import Tag

tag = APIRouter()

@tag.post('/tags', response_model=Tag, tags=['tags'])
def create_tag(tag : Tag):
    new_tag = dict(tag)
    id = connection.my_blog_db.tags.insert_one(new_tag).inserted_id
    tag = connection.my_blog_db.tags.find_one({"_id":id})
    return tag_entity(tag)

@tag.get('/tags', response_model=list[Tag], tags=['tags'])
def find_all_tags():
    return tags_entity(connection.my_blog_db.tags.find())

@tag.get('/tags/{id}', response_model=Tag, tags=['tags'])
def find_tag(id:str):
    return tag_entity(connection.my_blog_db.tags.find_one({"_id":ObjectId(id)}))

@tag.put('/tags/{id}', response_model=Tag, tags=['tags'])
async def update_tag(id:str, tag:Tag):
    connection.my_blog_db.tags.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": tag.model_dump()},
        return_document=ReturnDocument.AFTER
    )
    return(find_tag(id))

@tag.delete('/tags/{id}', status_code=status.HTTP_204_NO_CONTENT, tags=['tags'])
def tag_delete(id:str):
    tag_entity(connection.my_blog_db.tags.find_one_and_delete({"_id":ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)