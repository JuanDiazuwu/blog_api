from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
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
    email: str

    class Config:
        from_attributes = True
        populate_by_alias = True
        json_encoders = {ObjectId: str}


class UpdateUser(BaseModel):
    username: str
    email: str

    class Config:
        from_attributes = True
        populate_by_alias = True
        json_encoders = {ObjectId: str}
