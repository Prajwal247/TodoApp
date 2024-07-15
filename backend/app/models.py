from pydantic import BaseModel

class TodoItem(BaseModel):
    id: str = None
    title: str
    summary: str

class User(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
