from fastapi import FastAPI,Query;
from fastapi.middleware.cors import CORSMiddleware
from routes.route import router
from config.database import collection_name
from models.book_model import Books
from schemas.schemas import list_serial
from pymongo import ASCENDING
from bson.regex import Regex



app = FastAPI()


origins = [
    "http://127.0.0.1:5173",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:5173/"
    "https://example.com",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/books")
async def create_book(book:Books):
    result = collection_name.insert_one(dict(book))
    return {"message": "Book created successfully", "book_id": str(result.inserted_id)}

@router.get("/")
def get_books(skip:int=0,limit:int =40,genre:str=None,search:str=Query(None,alias="search"),year:str=Query(None,alias="year"),price:int=Query(...,alias="price"),popularity:int=Query(...,alias="sort")):
    # print(search)
    sort_criteria = []
    if price!=0: 
        sort_criteria.append(("price",price))
    # sort_criteria = [("ratings",-1)]
    if popularity == 1:
        sort_criteria.append(("ratings", -1))  # Secondary sort field and descending order
    if popularity==2:
        sort_criteria.append(("_id", -1))  # Secondary sort field and ascending order
    query = {}  # Define your query based on genre or any other conditions

    if genre is not None and genre!='false':
        query["genre"] = genre
    if year is not None and year!='null':
        query["publication"] = {"$regex": Regex(f".*{year}.*", "i")}
    if search is not None and search!='null':
        query["$or"] = [
        {"title": {"$regex": f".*{search}.*", "$options": "i"}},
        {"author": {"$regex": f".*{search}.*", "$options": "i"}},
    ]
    
    if len(sort_criteria) > 0 :
        books = list_serial(collection_name.find(query).sort(sort_criteria).skip(skip).limit(limit))
    else:
        books = list_serial(collection_name.find(query).skip(skip).limit(limit))
    return books
    
app.include_router(router)