from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Category(BaseModel):
    category_name : str
    created_at : Optional[datetime] = datetime.now()