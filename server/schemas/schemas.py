def individual_serial(book) -> dict:
    return {
        "id":str(book["_id"]),
        "title":book["title"],
        "author":book["author"],
        "description":book["description"],
        "coverImage":book["coverImage"],
        "price":book["price"],
        "ratings":book["ratings"],
        "publication":book["publication"],
        "genre":book["genre"],
    }
    
def list_serial(books)->list:
    return[individual_serial(book) for book in books]