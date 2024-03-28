def category_entity(item) -> dict:
    return {
        "_id": str(item['_id']),
        "category_name": item["category_name"],
        "created_at": item["created_at"]
    }

def categories_entity(entity) -> list:
    return [category_entity(item) for item in entity]