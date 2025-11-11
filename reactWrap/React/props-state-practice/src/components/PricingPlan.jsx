// src/components/PricingPlan.jsx

export default function PricingPlan({ name, price, showCTA = true }) {
  return (
    <div className="pricing" style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      margin: "10px",
      textAlign: "center",
      width: "200px"
    }}>
      <h3>{name}</h3>
      <strong>₹ {price}/mo</strong>
      <div style={{ marginTop: "8px" }}>
        {showCTA ? (
          <button>Start free trial</button>
        ) : (
          <small>Contact sales</small>
        )}
      </div>
    </div>
  );
}
// passing props from parent n with some fallback values