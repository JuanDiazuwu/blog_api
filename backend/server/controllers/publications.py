from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

# from decouple import config

from server.models.publication import Publication, UpdatePublication

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.my_blog_db
collection = db.publications


async def index_publication(id):
    publication = await collection.find_one({"_id": ObjectId(id)})
    return publication


async def index_by_title(publication_title):
    publication = await collection.find_one({"title": publication_title})
    return publication


async def list_publications():
    publications = []
    cursor = collection.find({})
    async for publication in cursor:
        publications.append(Publication(**publication))
    return publications


async def create_publication(publication):
    new_publication = await collection.insert_one(publication)
    created_publication = await collection.find_one(
        {"_id": new_publication.inserted_id}
    )
    return created_publication


async def replace_publication(id: str, data: UpdatePublication):
    publication = {
        key: value for key, value in data.model_dump().items() if value is not None
    }
    await collection.update_one({"_id": ObjectId(id)}, {"$set": publication})
    document = await collection.find_one({"_id": ObjectId(id)})
    return document


async def destroy_publication(id):
    await collection.delete_one({"_id": ObjectId(id)})
    return True
