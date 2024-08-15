from google.oauth2 import id_token
from google.auth.transport import requests

import os


def get_verified_user(google_token):
    idinfo = id_token.verify_oauth2_token(google_token, requests.Request())
    
    if idinfo['aud'] not in [os.getenv("GOOGLE_ANDROID_CLIENT_ID"), 
                             os.getenv("GOOGLE_IOS_CLIENT_ID"),
                             os.getenv("GOOGLE_WEB_CLIENT_ID")]:
        raise ValueError(f"Could not verify audience of type {idinfo['aud']}.")

    # ID token is valid. Get the user's Google Account ID from the decoded token.
    return idinfo['sub']