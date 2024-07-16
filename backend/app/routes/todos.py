from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models import TodoItem
import uuid
from dotenv import load_dotenv
from app.utils.utils import MongoDB
from bson import ObjectId

router = APIRouter()

# Database configuration
mongo = MongoDB()
user_collection = mongo.get_collection("users")
todo_collection = mongo.get_collection("todos")

@router.get("/todos/", response_model=List[TodoItem])
async def read_todos():
    todos = await todo_collection.find().to_list(1000)
    return todos

@router.post("/todos/", response_model=TodoItem)
async def create_todo(todo: TodoItem):
    todo_data = todo.dict()
    todo_data['id']= str(uuid.uuid4())
    new_todo = await todo_collection.insert_one(todo_data)
    created_todo = await todo_collection.find_one({"_id": new_todo.inserted_id})
    return created_todo


@router.put("/todos/{todo_id}")
async def update_todo(todo_id: str, todo: TodoItem, ):
    todo = todo.dict()
    todo['id'] = todo_id
    update_result = await todo_collection.update_one(
        {"id": todo_id},
        {"$set": todo}
    )
    if update_result.modified_count == 1:
        updated_todo = await todo_collection.find_one({"id": todo_id})
        return updated_todo
    raise HTTPException(status_code=404, detail="Todo not found")


@router.delete("/todos/{todo_id}")
async def delete_todo(todo_id: str, ):
    delete_result = await todo_collection.delete_one({"id":todo_id})
    if delete_result.deleted_count == 1:
        return {"detail": "Todo deleted"}
    raise HTTPException(status_code=404, detail="Todo not found")
