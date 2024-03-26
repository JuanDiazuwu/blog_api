from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Comment(BaseModel):
    user_id : str #user : User
    content : str
    publication_id : str # publication : Publication
    created_at: Optional[datetime] = datetime.now()