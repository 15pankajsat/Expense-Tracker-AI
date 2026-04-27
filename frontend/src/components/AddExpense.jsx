import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function AddExpense({ refresh }) {
  const [form, setForm] = useState({
    amount: "",
    merchant: "",
    category: "Auto",
    date: "",   // ✅ already correct
  });

  const handleSubmit = async () => {
    if (!form.amount || !form.merchant || !form.date) {
      alert("Fill all fields!");
      return;
    }

    try {
      await axios.post(`${API}/expenses/`, {
        ...form,
        amount: Number(form.amount),
      });

      // 🔄 reset form
      setForm({
        amount: "",
        merchant: "",
        category: "Auto",
        date: "",
      });

      refresh();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h3>Add Expense</h3>

      {/* 💰 Amount */}
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      {/* 🏪 Merchant */}
      <input
        placeholder="Merchant"
        value={form.merchant}
        onChange={(e) => setForm({ ...form, merchant: e.target.value })}
      />

      {/* 📅 Date */}
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      {/* 📂 Category */}
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="Auto">Auto (AI decide)</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Health">Health</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Education">Education</option>
        <option value="Rent">Rent</option>
        <option value="Fuel">Fuel</option>
        <option value="Groceries">Groceries</option>
        <option value="Subscriptions">Subscriptions</option>
        <option value="Other">Other</option>
      </select>

      {/* ➕ Button */}
      <button onClick={handleSubmit}>Add Expense</button>
    </div>
  );
}