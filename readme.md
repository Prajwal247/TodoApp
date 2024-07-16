# TODO Application

This project is a TODO application built with React, FastAPI, and MongoDB. It allows users to manage tasks with basic CRUD operations.

## Features

- **User Authentication**: Users can register and login to manage their TODO lists.
- **Task Management**: Create, read, update, and delete tasks.
- **Session Management**: Sessions are managed securely with JWT tokens.
- **Responsive Design**: The frontend is designed to be responsive using React components.

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: FastAPI (Python), MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Folder Structure
todo-app/
│
├── frontend/ # React frontend code
└── backend/ # FastAPI backend code
    ├── app/
    │ ├── api/ # API routes
    │ ├── models/ 
    │ └── main.py # FastAPI application entry point
    │
    ├── requirements.txt # Python dependencies
    └── Dockerfile # Docker configuration for backend deployment


## Getting Started

### Prerequisites

- Node.js and npm for the frontend
- Python 3.7+ and pip for the backend
- MongoDB instance (local or cloud-based)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Prajwal247/TodoApp
   cd todo-app

2. **Backend Setup:**
    ```bash
    cd backend
    python -m venv venv       # Create virtual environment (optional)
    source venv/bin/activate  # Activate virtual environment (Linux/Mac)
    .\venv\Scripts\activate   # Activate virtual environment (Windows)
    pip install -r requirements.txt

    python main.py

3. **Frontend Setup:**
    ```
    cd frontend
    npm install
    npm start

### Detail Documentation:
Detail Documentaion can be found here: https://drive.google.com/file/d/10tM45U3n7k_MiY4AJx43mQh9ZAv-6la4/view?usp=sharing