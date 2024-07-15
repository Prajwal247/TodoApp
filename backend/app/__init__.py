from fastapi import FastAPI
from app.routes import todos, auth

app = FastAPI()

# Include routers
app.include_router(auth.router)
app.include_router(todos.router)
