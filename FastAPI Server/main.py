from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

from models.google_login_data import GoogleLoginData
from auth import get_verified_user

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/user/login")
async def login_with_google(login_data: GoogleLoginData):
    try:
        # Verify user token with google and get it
        user_data = get_verified_user(login_data.token)

        # User is verified.
        # Check if user in database, if yes, create session (if doesn't exist) and return sessionId
        # If not in database, save user details, create session and return sessionId

        return JSONResponse(content=user_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))