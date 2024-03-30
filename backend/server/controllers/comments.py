from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from decouple import config

from server.models.comment import Comment, UpdateComment

client = AsyncIOMotorClient(config("MONGO_URL"))
db = client.my_blog_db
collection = db.comments


async def index_comment(id):
    comment = await collection.find_one({"_id": ObjectId(id)})
    return comment


async def list_comments():
    comments = []
    cursor = collection.find({})
    async for comment in cursor:
        comments.append(Comment(**comment))
    return comments


async def create_comment(comment):
    new_comment = await collection.insert_one(comment)
    created_comment = await collection.find_one({"_id": new_comment.inserted_id})
    return created_comment


async def replace_comment(id: str, data: UpdateComment):
    comment = {
        key: value for key, value in data.model_dump().items() if value is not None
    }
    await collection.update_one({"_id": ObjectId(id)}, {"$set": comment})
    document = await collection.find_one({"_id": ObjectId(id)})
    return document


async def destroy_comment(id):
    await collection.delete_one({"_id": ObjectId(id)})
    return True
