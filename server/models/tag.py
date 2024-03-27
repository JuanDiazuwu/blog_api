from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Tag(BaseModel):
    tag_name : str
    created_at : Optional[datetime] = datetime.now()