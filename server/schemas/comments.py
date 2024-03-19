def commentEntity(item) -> dict:
    return {
        "content": item["content"],
        "user_id": item["user_id"],
        "date": item["date"]
    }

def commentsEntity(entity) -> list:
    return [commentEntity(item) for item in entity]