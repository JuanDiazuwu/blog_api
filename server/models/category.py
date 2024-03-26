from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Category(BaseModel):
    name : str
    created_at : Optional[datetime] = datetime.now()