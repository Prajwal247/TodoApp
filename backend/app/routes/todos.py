from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models import TodoItem
from app.routes.auth import get_current_user
import uuid

router = APIRouter()

# Mock database
fake_db = []

@router.get("/todos/", response_model=List[TodoItem])
async def read_todos():
    return fake_db

@router.post("/todos/", response_model=TodoItem)
async def create_todo(todo: TodoItem):
    todo.id = str(uuid.uuid4())
    fake_db.append(todo)
    return todo

@router.put("/todos/{todo_id}", response_model=TodoItem)
async def update_todo(todo_id: str, todo: TodoItem, ):
    for t in fake_db:
        if t.id == todo_id:
            t.title = todo.title
            t.summary = todo.summary
            return t
    raise HTTPException(status_code=404, detail="Todo item not found")

@router.delete("/todos/{todo_id}", response_model=TodoItem)
async def delete_todo(todo_id: str, ):
    for i, t in enumerate(fake_db):
        if t.id == todo_id:
            del fake_db[i]
            return t
    raise HTTPException(status_code=404, detail="Todo item not found")
