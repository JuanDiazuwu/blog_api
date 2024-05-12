from typing import Optional, List
from pydantic import ConfigDict, BaseModel, Field
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    # TODO[pydantic]: We couldn't refactor `__get_validators__`, please create the `__get_pydantic_core_schema__` manually.
    # Check https://docs.pydantic.dev/latest/migration/#defining-custom-types for more information.
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, values, **kwargs):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)


class Publication(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    content: str
    user_id: Optional[PyObjectId] = Field(alias="user_id", default=None)
    categories: Optional[List[PyObjectId]] = Field(alias="categories", default=None)
    tags: Optional[List[PyObjectId]] = Field(alias="tags", default=None)
    comments: Optional[List[PyObjectId]] = Field(alias="comments", default=None)
    created_at: Optional[datetime] = datetime.now()
    model_config = ConfigDict(from_attributes=True, populate_by_alias=True)


class UpdatePublication(BaseModel):
    title: Optional[str] = None 
    content: Optional[str] = None
    comments: Optional[List[PyObjectId]] = None
    model_config = ConfigDict(from_attributes=True, populate_by_alias=True)
