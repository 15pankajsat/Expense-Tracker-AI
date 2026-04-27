# Expense Tracker AI 🚀

A smart full-stack Expense Tracker application built using React, FastAPI, SQLite, and AI-based categorization. This project helps users manage daily expenses, analyze spending habits, and track financial data efficiently.

---

## 📌 Features

### ✅ Expense Management
- Add new expenses
- Delete expenses
- Store data permanently using SQLite database

### 🤖 AI Categorization
- Auto-detects category based on merchant name

Examples:
- Zomato → Food
- Uber → Travel
- Amazon → Shopping

### 📅 Date Range Filter
- Filter expenses using From Date and To Date

### 📊 Dashboard Insights
- Total Expenses
- Monthly Spending
- Top Category
- Average Expense

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- FastAPI
- Python

### Database
- SQLite

### AI Logic
- Keyword-based Categorization

---

## 📁 Project Structure

expense-tracker-ai/
│── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
│── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models.py
│   ├── database.py
│   └── main.py
│
└── README.md

---

## 🚀 How to Run Project

## 1️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs on:

http://127.0.0.1:8000

Swagger Docs:

http://127.0.0.1:8000/docs

2️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000

🔥 API Endpoints
Add Expense

POST /expenses/

Get All Expenses

GET /expenses/

Delete Expense

DELETE /expenses/{id}

Date Filter

GET /expenses/?from_date=2024-04-01&to_date=2024-04-30

📈 Future Enhancements
Pie Chart / Bar Graph
AI Spending Suggestions
User Login Authentication
Export Reports (PDF / Excel)
