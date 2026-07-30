from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import router

app = FastAPI(
    title="Smart Inventory Management API",
    description="Backend API for Smart Inventory System"
)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://localhost:5174",
#         "http://localhost:4173",
#         "http://localhost:5175"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # "http://localhost:5173",
        "https://smart-inventory-system-kohl.vercel.app",
        "https://red-salamander-222156.hostingersite.com",
        "https://smart-inventory-frontend.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, tags=["Products"])

@app.get("/")
def home():
    return {
        "message": "Welcome to Smart Inventory Management API"
    }