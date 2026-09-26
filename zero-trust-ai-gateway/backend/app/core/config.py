import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not configured")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not configured")
