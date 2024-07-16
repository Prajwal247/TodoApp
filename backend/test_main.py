import pytest
from fastapi.testclient import TestClient
from main import app
from app.database import startup_db_client, shutdown_db_client, db
from app.security.auth_handler import get_password_hash

client = TestClient(app)

@pytest.fixture(autouse=True, scope="module")
async def setup_and_teardown():
    await startup_db_client()
    await db["users"].insert_one({
        "username": "testuser",
        "hashed_password": get_password_hash("testpassword")
    })
    yield
    await db["users"].delete_many({})
    await shutdown_db_client()

def test_register_user():
    response = client.post("/register/", json={"username": "newuser", "password": "newpassword"})
    assert response.status_code == 200
    assert response.json()["username"] == "newuser"

def test_register_existing_user():
    response = client.post("/register/", json={"username": "testuser", "password": "testpassword"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Username already registered"}

def test_login_user():
    response = client.post("/token", data={"username": "testuser", "password": "testpassword"})
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_login_invalid_user():
    response = client.post("/token", data={"username": "invaliduser", "password": "invalidpassword"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Incorrect username or password"}

def test_get_current_user():
    login_response = client.post("/token", data={"username": "testuser", "password": "testpassword"})
    token = login_response.json()["access_token"]

    response = client.get("/users/me/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"

def test_get_current_user_unauthorized():
    response = client.get("/users/me/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}
