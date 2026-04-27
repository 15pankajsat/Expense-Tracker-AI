import { useState } from "react";

export default function DateFilter({ onFilter }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const applyFilter = () => {
    onFilter({ from, to });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Filter by Date</h3>

      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <button onClick={applyFilter}>Apply</button>
    </div>
  );
}