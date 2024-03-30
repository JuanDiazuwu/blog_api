from typing import Optional, List
from pydantic import BaseModel, Field
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

class Publication(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id', default=None)
    title : str
    content : str
    user_id : Optional[PyObjectId] = Field(alias='user_id', default=None)
    categories:  Optional[List[PyObjectId]] = Field(alias='categories', default=None)
    tags : Optional[List[PyObjectId]] = Field(alias='tags', default=None)
    comments : Optional[List[PyObjectId]] = Field(alias='tags   ', default=None)
    created_at: Optional[datetime] = datetime.now()

    class Config:
        from_attributes = True
        populate_by_alias = True
        json_encoders = {ObjectId: str}

class UpdatePublication(BaseModel):
    title : str
    content : str
    #TO DO categories, tags, comments

    class Config:
        from_attributes = True
        populate_by_alias = True
        json_encoders = {ObjectId: str}