from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import execution, dashboard
from app.db.init_db import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Execute startup logic: initialize the Neon database schema and mock data
    init_db()
    yield
    # Execution pauses here while the app runs, resuming on shutdown

app = FastAPI(
    title="Zero-Trust AI Execution Gateway",
    lifespan=lifespan
)

# Permit frontend UI to communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Register endpoints
app.include_router(execution.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
