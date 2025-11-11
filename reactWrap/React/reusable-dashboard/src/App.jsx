// src/App.jsx
import UsersDashboard from "./pages/UsersDashboard";
import ProductsDashboard from "./pages/ProductsDashboard";

export default function App() {
  return (
    <div style={{ padding: "1rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>🌟 Reusable Dashboard</h1>
      <UsersDashboard />
      <hr style={{ margin: "2rem 0", borderColor: "#e5e7eb" }} />
      <ProductsDashboard />
    </div>
  );
}
