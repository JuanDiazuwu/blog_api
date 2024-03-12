def userEntity(item) -> dict:
    user_dict = {
        "name": item["name"],
        "email": item["email"],
        "password": item["password"]
    }
    if "_id" in item:
        user_dict["id"] = str(item["_id"])
    return user_dict

def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]