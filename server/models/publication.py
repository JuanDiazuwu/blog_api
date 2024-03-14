from typing import List
from pydantic import BaseModel
from datetime import datetime
from user import User
from category import Category
from tag import Tag
from comment import Comment

class Publication(BaseModel):
    title : str
    date: datetime
    content : str
    categories:  List[Category]
    tags : List[Tag]
    comments : List[Comment]
    user : User
