from sqlalchemy.orm import Session
import models
from ai_engine.predictor import predict

def get_prediction(db: Session):
    expenses = db.query(models.Expense).all()
    return {"predicted_avg": predict(expenses)}

def get_anomalies(db: Session):
    expenses = db.query(models.Expense).all()

    avg = sum([e.amount for e in expenses]) / len(expenses) if expenses else 0

    anomalies = [e for e in expenses if e.amount > avg * 2]

    return anomalies