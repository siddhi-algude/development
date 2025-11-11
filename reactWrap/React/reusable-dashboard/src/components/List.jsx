// src/components/List.jsx
export default function List({ items = [], renderItem, emptyText = "No data" }) {
  if (!items?.length) return <p style={{ opacity: 0.7 }}>{emptyText}</p>;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, idx) => (
        <li key={item.id ?? idx} style={{ marginBottom: "0.75rem" }}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
