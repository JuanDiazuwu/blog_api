from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from decouple import config

from server.models.category import Category, UpdateCategory

client = AsyncIOMotorClient("mongodb://0.0.0.0:27017")
db = client.my_blog_db
collection = db.categories


async def index_category(id):
    category = await collection.find_one({"_id": ObjectId(id)})
    return category


async def index_by_name(category_name):
    category = await collection.find_one({"category_name": category_name})
    return category


async def list_categories():
    categories = []
    cursor = collection.find({})
    async for category in cursor:
        categories.append(Category(**category))
    return categories


async def create_category(category):
    new_category = await collection.insert_one(category)
    created_category = await collection.find_one({"_id": new_category.inserted_id})
    return created_category


async def replace_category(id: str, data: UpdateCategory):
    category = {
        key: value for key, value in data.model_dump().items() if value is not None
    }
    await collection.update_one({"_id": ObjectId(id)}, {"$set": category})
    document = await collection.find_one({"_id": ObjectId(id)})
    return document


async def destroy_category(id):
    await collection.delete_one({"_id": ObjectId(id)})
    return True
