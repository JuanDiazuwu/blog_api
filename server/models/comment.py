from pydantic import BaseModel
from datetime import datetime
#from user import User

class Comment(BaseModel):
    content : str
    user_id : int # user : User
    date : datetime

