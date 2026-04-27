from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from controllers import insights_controller

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/predict")
def predict(db: Session = Depends(get_db)):
    return insights_controller.get_prediction(db)

@router.get("/anomaly")
def anomaly(db: Session = Depends(get_db)):
    return insights_controller.get_anomalies(db)