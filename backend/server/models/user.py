from typing import Optional
from pydantic import ConfigDict, BaseModel, Field, EmailStr
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


class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    username: str
    email: EmailStr
    model_config = ConfigDict(from_attributes=True, populate_by_alias=True)


class UpdateUser(BaseModel):
    username: str
    email: EmailStr
    model_config = ConfigDict(from_attributes=True, populate_by_alias=True)
