from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    
    @classmethod
    def validate(cls, v, values, **kwargs):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid ObjectId')
        return str(v)

class Category(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id', default=None)
    category_name : str
    created_at : Optional[datetime] = datetime.now()

    class Config:
        from_attributes = True
        populate_by_alias = True
        json_encoders = {ObjectId: str}

class UpdateCategory(BaseModel):
    category_name : str

    class Config:
        from_attributes = True
        populate_by_alias = True
        json_encoders = {ObjectId: str}