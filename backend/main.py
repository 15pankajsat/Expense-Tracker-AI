from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine

from routes import expense, insights

# ✅ Create tables
models.Base.metadata.create_all(bind=engine)

# ✅ App init
app = FastAPI()

# ✅ CORS FIX (important for frontend & swagger issues)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # production me specific domain dena
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routes
app.include_router(expense.router, prefix="/expenses", tags=["Expenses"])
app.include_router(insights.router, prefix="/insights", tags=["Insights"])

# ✅ Root API
@app.get("/")
def root():
    return {"message": "Expense Tracker API Running 🚀"}