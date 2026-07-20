from fastapi import FastAPI
from .routes import router


app = FastAPI(
    title = "Smart Inventory Management API",
    description= "Backend API for Smart Inventory System"
)

app.include_router(router, tags=["Products"])

@app.get("/")
def home():
    return{
        "message" : "Welcome to Smart Inventory Management API"
    }