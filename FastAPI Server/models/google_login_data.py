from pydantic import BaseModel

class GoogleLoginData(BaseModel):
    # name: str
    token: str