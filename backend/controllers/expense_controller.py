from sqlalchemy.orm import Session
import models
from typing import Optional
from datetime import date

from ai_engine.categorizer import categorize
from ai_engine.anomaly import detect_anomaly

# ➕ CREATE
def create_expense(db: Session, expense):
    # 👇 Smart logic (Auto vs Manual category)
    if expense.category == "Auto":
        category = categorize(expense.merchant)
    else:
        category = expense.category

    db_expense = models.Expense(
        amount=expense.amount,
        merchant=expense.merchant,
        category=category,
        date=expense.date
    )

    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)

    return db_expense


# 📥 GET ALL (WITH DATE FILTER ✅)
def get_expenses(
    db: Session,
    from_date: Optional[date] = None,
    to_date: Optional[date] = None
):
    query = db.query(models.Expense)

    if from_date:
        query = query.filter(models.Expense.date >= from_date)

    if to_date:
        query = query.filter(models.Expense.date <= to_date)

    return query.all()


# ❌ DELETE
def delete_expense(db: Session, id: int):
    expense = db.query(models.Expense).filter(models.Expense.id == id).first()

    if not expense:
        return {"error": "Not found"}

    db.delete(expense)
    db.commit()

    return {"message": "Deleted successfully"}