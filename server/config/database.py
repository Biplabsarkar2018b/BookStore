from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://biplabsarkar2018b:Biplab123@cluster0.oy2r8ec.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri)

db = client.book_store_db
collection_name = db["book_store_collection"]