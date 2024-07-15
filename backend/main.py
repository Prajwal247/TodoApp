from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import app
import uvicorn


origins = [
    "http://localhost:3000",  # your React app's origin
    # add other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Run the application
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
