from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Comment(BaseModel):
    content : str
    user_id : str #user : User
    date: Optional[datetime] = datetime.now()