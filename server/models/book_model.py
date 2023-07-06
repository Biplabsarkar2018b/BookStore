from pydantic import BaseModel

class Books(BaseModel):
    title:str
    author:str
    description:str
    coverImage:str
    price:int
    ratings:int
    publication:str
    genre:str