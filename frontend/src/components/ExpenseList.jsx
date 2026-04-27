import axios from "axios";

const API = "http://localhost:8000";

export default function ExpenseList({ data, refresh }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/expenses/${id}`);
      refresh();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <h3>Expenses</h3>

      {data.length === 0 ? (
        <p>No expenses yet 😅</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.map((e) => (
            <li
              key={e.id}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f9f9f9",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <span>
                ₹{e.amount} - {e.merchant} ({e.category})
              </span>

              <button
                onClick={() => handleDelete(e.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}