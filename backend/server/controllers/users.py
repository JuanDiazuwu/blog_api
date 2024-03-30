from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
#from decouple import config

from server.models.user import User, UpdateUser

client = AsyncIOMotorClient('mongodb://localhost:27017')
db = client.my_blog_db
collection = db.users

async def index_user(id):
    user = await collection.find_one({'_id':ObjectId(id)})
    return user

async def list_users():
    users = []
    cursor = collection.find({})
    async for user in cursor:
        users.append(User(**user))
    return users

async def create_user(user):
    new_user = await collection.insert_one(user)
    created_user = await collection.find_one({'_id':new_user.inserted_id})
    return created_user

async def replace_user(id:str, data:UpdateUser):
    user = {key : value 
                for key, value in data.model_dump().items() 
                    if value is not None}
    await collection.update_one({'_id':ObjectId(id)}, {'$set':user})
    document = await collection.find_one({'_id':ObjectId(id)})
    return document

async def destroy_user(id):
    await collection.delete_one({'_id':ObjectId(id)})
    return True