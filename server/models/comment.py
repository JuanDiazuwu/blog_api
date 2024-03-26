from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Comment(BaseModel):
    # publication : Publication
    user_id : str #user : User
    content : str
    created_at: Optional[datetime] = datetime.now()