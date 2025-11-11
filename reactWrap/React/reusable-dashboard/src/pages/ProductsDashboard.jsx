// src/pages/ProductsDashboard.jsx
import useFetch from "../hooks/useFetch";
import List from "../components/List";
import Card from "../components/Card";
import Button from "../components/Button";

export default function ProductsDashboard() {
  const { data: products, loading, error } = useFetch("https://fakestoreapi.com/products");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div>
      <h2>🛒 Products Dashboard</h2>
      <List
        items={products}
        renderItem={(p) => (
          <Card
            key={p.id}
            title={p.title}
            footer={<Button size="sm">Add to Cart</Button>}
          >
            <p>Price: ${p.price}</p>
            <p>{p.category}</p>
          </Card>
        )}
        emptyText="No products"
      />
    </div>
  );
}
