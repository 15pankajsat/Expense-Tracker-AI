import { useEffect, useState } from "react";
import axios from "axios";

import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Dashboard from "./components/Dashboard";

import "./App.css";

const API = "http://localhost:8000";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔥 FETCH FUNCTION
  const fetchData = async (from = "", to = "") => {
    try {
      let url = `${API}/expenses/`;

      if (from || to) {
        url += `?from_date=${from}&to_date=${to}`;
      }

      const res = await axios.get(url);
      setData(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Backend not connected ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ONLY INITIAL LOAD
  useEffect(() => {
    fetchData();
  }, []);

  // ✅ APPLY FILTER BUTTON
  const applyFilter = () => {
    fetchData(fromDate, toDate);
  };

  // ✅ RESET FILTER
  const resetFilter = () => {
    setFromDate("");
    setToDate("");
    fetchData();
  };

  return (
    <div className="container">
      <h1>Expense Tracker AI 🚀</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📅 FILTER UI */}
      <div className="card">
        <h3>Filter by Date 📅</h3>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button onClick={applyFilter}>Apply</button>
        <button onClick={resetFilter}>Reset</button>
      </div>

      <div className="card">
        <AddExpense refresh={fetchData} />
      </div>

      <div className="card">
        <ExpenseList data={data} refresh={fetchData} />
      </div>

      <div className="card">
        <Dashboard data={data} />
      </div>
    </div>
  );
}

export default App;