from pydantic import ConfigDict, BaseModel, Field
from typing import Optional
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


class Category(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    category_name: str
    created_at: Optional[datetime] = datetime.now()
    model_config = ConfigDict(from_attributes=True, populate_by_alias=True)


class UpdateCategory(BaseModel):
    category_name: str
    model_config = ConfigDict(from_attributes=True, populate_by_alias=True)
