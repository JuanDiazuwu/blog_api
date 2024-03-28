def commentEntity(item) -> dict:
    return {
        "user_id": item["user_id"],
        "content": item["content"],
        "publication_id": item["publication_id"],
        "created_at": item["created_at"]
    }

def commentsEntity(entity) -> list:
    return [commentEntity(item) for item in entity]