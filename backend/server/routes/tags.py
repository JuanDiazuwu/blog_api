from fastapi import APIRouter, HTTPException

from server.controllers.tags import (
    index_tag,
    index_by_name,
    list_tags,
    create_tag,
    replace_tag,
    destroy_tag,
)
from server.models.tag import Tag, UpdateTag

tag = APIRouter()


@tag.get("/tags/{id}", response_model=Tag)
async def get_tag(id: str):
    response = await index_tag(id)
    if response:
        return response
    raise HTTPException(404, f"There is no tag with the id {id}")


@tag.get("/tags")
async def get_tags():
    response = await list_tags()
    return response


@tag.post("/tags", response_model=Tag)
async def post_tag(tag: Tag):
    tag_found = await index_by_name(tag.tag_name)
    if tag_found:
        raise HTTPException(409, "Tag already exists")

    response = await create_tag(tag.model_dump())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")


@tag.put("/tags/{id}", response_model=Tag)
async def put_tag(id: str, data: UpdateTag):
    response = await replace_tag(id, data)
    if response:
        return response
    raise HTTPException(404, f"There is no tag with the id {id}")


@tag.delete("/tags/{id}")
async def delete_tag(id: str):
    response = await destroy_tag(id)
    if response:
        return "Successfully deleted tag"
    raise HTTPException(404, f"There is no tag with the id {id}")
