import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const API = "http://localhost:8000";

export default function Dashboard({ data }) {
  const [anomaly, setAnomaly] = useState("");
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    fetchAnomaly();
    fetchPrediction();
  }, [data]);

  const fetchAnomaly = async () => {
    try {
      const res = await axios.get(`${API}/insights/anomaly`);
      setAnomaly(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPrediction = async () => {
    try {
      const res = await axios.get(`${API}/insights/predict`);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.log(err);
    }
  };

  // 📊 Grouping
  const grouped = {};
  data.forEach((e) => {
    grouped[e.category] = (grouped[e.category] || 0) + e.amount;
  });

  const chartData = Object.keys(grouped).map((key) => ({
    name: key,
    value: grouped[key],
  }));

  const monthlyData = data.map((e, i) => ({
    name: `Tx ${i + 1}`,
    amount: e.amount,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // 📊 Summary
  const totalExpense = data.reduce((sum, e) => sum + e.amount, 0);
  const thisMonthExpense = totalExpense;

  let maxCategory = "";
  let maxAmount = 0;

  Object.entries(grouped).forEach(([cat, amt]) => {
    if (amt > maxAmount) {
      maxAmount = amt;
      maxCategory = cat;
    }
  });

  const avgExpense =
    data.length > 0 ? (totalExpense / data.length).toFixed(2) : 0;

  // 💰 Budget
  const BUDGET = 5000;
  const isOverBudget = totalExpense > BUDGET;

  return (
    <div>
      <h3>Insights Dashboard</h3>

      {/* 📊 Cards */}
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <div className="card"><h4>Total</h4><p>₹{totalExpense}</p></div>
        <div className="card"><h4>This Month</h4><p>₹{thisMonthExpense}</p></div>
        <div className="card"><h4>Top</h4><p>{maxCategory || "N/A"} (₹{maxAmount})</p></div>
        <div className="card"><h4>Avg</h4><p>₹{avgExpense}</p></div>
      </div>

      {/* 💰 Budget Alert */}
      {isOverBudget && (
        <p style={{ background: "red", color: "white", padding: "10px", borderRadius: "8px" }}>
          ⚠️ Budget Exceeded! Limit: ₹{BUDGET}
        </p>
      )}

      {/* 🚨 Anomaly */}
      {anomaly && <p style={{ color: "red" }}>⚠️ {anomaly}</p>}

      {/* 🤖 Prediction */}
      {prediction && <p style={{ color: "green" }}>🤖 ₹{prediction}</p>}

      {/* 📊 Pie */}
      <h4>Category Chart</h4>
      <PieChart width={350} height={250}>
        <Pie data={chartData} dataKey="value" nameKey="name">
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* 📈 Line */}
      <h4>Trend</h4>
      <LineChart width={400} height={250} data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}