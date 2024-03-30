from fastapi import APIRouter, HTTPException

from server.controllers.categories import (
    index_category, index_by_name, list_categories, 
    create_category, replace_category, destroy_category
)
from server.models.category import Category, UpdateCategory

category = APIRouter()

@category.get('/categories/{id}', response_model=Category)
async def get_category(id:str):
    response = await index_category(id)
    if response:
        return response
    raise HTTPException(404, f"There is no category with the id {id}")

@category.get('/categories')
async def get_categories():
    response = await list_categories()
    return response

@category.post('/categories', response_model=Category)
async def post_category(category:Category):
    category_found = await index_by_name(category.category_name)
    if category_found:
        raise HTTPException(409, "Category already exists")

    response = await create_category(category.model_dump())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@category.put('/categories/{id}', response_model=Category)
async def put_category(id:str, data:UpdateCategory):
    response = await replace_category(id, data)
    if response:
        return response
    raise HTTPException(404, f"There is no category with the id {id}")

@category.delete('/categories/{id}')
async def delete_category(id: str):
    response = await destroy_category(id)
    if response:
        return "Successfully deleted category"
    raise HTTPException(404, f"There is no category with the id {id}")