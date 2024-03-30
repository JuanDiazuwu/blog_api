from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from decouple import config

from server.models.tag import Tag, UpdateTag

client = AsyncIOMotorClient(config("MONGO_URL"))
db = client.my_blog_db
collection = db.tags


async def index_tag(id):
    tag = await collection.find_one({"_id": ObjectId(id)})
    return tag


async def index_by_name(tag_name):
    tag = await collection.find_one({"tag_name": tag_name})
    return tag


async def list_tags():
    tags = []
    cursor = collection.find({})
    async for tag in cursor:
        tags.append(Tag(**tag))
    return tags


async def create_tag(tag):
    new_tag = await collection.insert_one(tag)
    created_tag = await collection.find_one({"_id": new_tag.inserted_id})
    return created_tag


async def replace_tag(id: str, data: UpdateTag):
    tag = {key: value for key, value in data.model_dump().items() if value is not None}
    await collection.update_one({"_id": ObjectId(id)}, {"$set": tag})
    document = await collection.find_one({"_id": ObjectId(id)})
    return document


async def destroy_tag(id):
    await collection.delete_one({"_id": ObjectId(id)})
    return True
