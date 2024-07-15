from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models import User, Token
from app.security.auth_handler import create_access_token, verify_password, get_password_hash

router = APIRouter()

# Mock database
fake_users_db = []

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

@router.post("/register/", response_model=User)
async def register_user(user: User):
    hashed_password = get_password_hash(user.password)
    fake_user = User(username=user.username, password=hashed_password)
    fake_users_db.append(fake_user)
    return fake_user

@router.post("/login/", response_model=Token)
async def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    print(form_data)
    user = next((u for u in fake_users_db if u.username == form_data.username), None)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = next((u for u in fake_users_db if u.username == username), None)
    if user is None:
        raise credentials_exception
    return user
