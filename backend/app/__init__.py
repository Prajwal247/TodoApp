from fastapi import FastAPI
from app.routes import todos, auth
from app.database import startup_db_client, shutdown_db_client

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await startup_db_client()

@app.on_event("shutdown")
async def on_shutdown():
    await shutdown_db_client()

# Include routers
app.include_router(auth.router)
app.include_router(todos.router)
