from pydantic import BaseModel
from datetime import date

# ➕ CREATE SCHEMA
class ExpenseCreate(BaseModel):
    amount: float
    merchant: str
    category: str
    date: date   # 👈 NEW FIELD


# 📤 RESPONSE SCHEMA
class ExpenseOut(BaseModel):
    id: int
    amount: float
    merchant: str
    category: str
    date: date   # 👈 ADD THIS ALSO

    class Config:
        from_attributes = True