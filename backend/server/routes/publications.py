from fastapi import APIRouter, HTTPException

from server.controllers.publications import (
    index_publication,
    index_by_title,
    list_publications,
    create_publication,
    replace_publication,
    destroy_publication,
)
from server.models.publication import Publication, UpdatePublication

publication = APIRouter()


@publication.get("/publications/{id}", response_model=Publication)
async def get_publication(id: str):
    response = await index_publication(id)
    if response:
        return response
    raise HTTPException(404, f"There is no publication with the id {id}")


@publication.get("/publications")
async def get_publications():
    response = await list_publications()
    return response


@publication.post("/publications", response_model=Publication)
async def post_publication(publication: Publication):
    publication_found = await index_by_title(publication.title)
    if publication_found:
        raise HTTPException(409, "Tag already exists")

    response = await create_publication(publication.model_dump())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")


@publication.put("/publications/{id}", response_model=Publication)
async def put_publication(id: str, data: UpdatePublication):
    response = await replace_publication(id, data)
    if response:
        return response
    raise HTTPException(404, f"There is no publication with the id {id}")


@publication.delete("/publications/{id}")
async def delete_publication(id: str):
    response = await destroy_publication(id)
    if response:
        return "Successfully deleted publication"
    raise HTTPException(404, f"There is no publication with the id {id}")
