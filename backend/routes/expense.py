from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import SessionLocal
from typing import Optional
from datetime import date

import schemas
from controllers import expense_controller

router = APIRouter()

# 🔌 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ➕ ADD EXPENSE
@router.post("/")
def add_expense(
    expense: schemas.ExpenseCreate,
    db: Session = Depends(get_db)
):
    return expense_controller.create_expense(db, expense)

# 📥 GET ALL EXPENSES (WITH DATE FILTER ✅)
@router.get("/")
def all_expenses(
    from_date: Optional[date] = Query(None),
    to_date: Optional[date] = Query(None),
    db: Session = Depends(get_db),
):
    return expense_controller.get_expenses(db, from_date, to_date)

# ❌ DELETE EXPENSE
@router.delete("/{id}")
def delete_expense(
    id: int,
    db: Session = Depends(get_db)
):
    return expense_controller.delete_expense(db, id)