from bson import ObjectId

def userEntity(item) -> dict:
    user_dict = {
        "username": item["username"],
        "email": item["email"],
    }
    if "_id" in item:
        user_dict["id"] = str(item["_id"])
    return user_dict

def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]