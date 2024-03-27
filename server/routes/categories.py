from bson import ObjectId
from fastapi import APIRouter, Response, status
from starlette.status import HTTP_204_NO_CONTENT
from pymongo import ReturnDocument

from server.config.db import connection
from server.schemas.categories import category_entity, categories_entity
from server.models.category import Category

category = APIRouter()

@category.post('/categories', response_model=Category, tags=['categories'])
def create_category(category : Category):
    new_category = dict(category)
    id = connection.my_blog_db.categories.insert_one(new_category).inserted_id
    category = connection.my_blog_db.categories.find_one({"_id":id})
    return category_entity(category)

@category.get('/categories', response_model=list[Category], tags=['categories'])
def find_all_categories():
    return categories_entity(connection.my_blog_db.categories.find())

@category.get('/categories/{id}', response_model=Category, tags=['categories'])
def find_category(id:str):
    return category_entity(connection.my_blog_db.categories.find_one({"_id":ObjectId(id)}))

@category.put('/categories/{id}', response_model=Category, tags=['categories'])
async def update_category(id:str, category:Category):
    connection.my_blog_db.categories.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": category.model_dump()},
        return_document=ReturnDocument.AFTER
    )
    return(find_category(id))

@category.delete('/categories/{id}', status_code=status.HTTP_204_NO_CONTENT, tags=['categories'])
def category_delete(id:str):
    category_entity(connection.my_blog_db.categories.find_one_and_delete({"_id":ObjectId(id)}))
    return Response(status_code=HTTP_204_NO_CONTENT)