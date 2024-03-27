def tag_entity(item) -> dict:
    return {
        "_id": str(item['_id']),
        "tag_name": item["tag_name"],
        "created_at": item["created_at"]
    }

def tags_entity(entity) -> list:
    return [tag_entity(item) for item in entity]