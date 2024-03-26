from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Tag(BaseModel):
    name : str
    created_at : Optional[datetime] = datetime.now()


