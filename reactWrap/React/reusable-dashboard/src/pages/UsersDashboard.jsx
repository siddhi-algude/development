// src/pages/UsersDashboard.jsx
import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import List from "../components/List";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function UsersDashboard() {
  const { data: users, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const [open, setOpen] = useState(false);
  const [localUsers, setLocalUsers] = useState([]);

  const mergedUsers = useMemo(
    () => [...(users || []), ...localUsers],
    [users, localUsers]
  );

  function handleAddUser(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = {
      id: Math.random().toString(36).slice(2),
      name: form.get("name"),
      email: form.get("email"),
      address: { city: form.get("city") || "—" },
    };
    setLocalUsers((prev) => [user, ...prev]);
    setOpen(false);
  }

  return (
    <div>
      <h2>👤 Users Dashboard</h2>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Button variant="primary" onClick={() => setOpen(true)}>Add User</Button>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error loading users</p>}

      <List
        items={mergedUsers}
        renderItem={(user) => (
          <Card
            key={user.id}
            title={user.name}
            footer={<span style={{ opacity: 0.75 }}>Email: {user.email}</span>}
          >
            <p>City: {user.address?.city}</p>
          </Card>
        )}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add New User"
        footer={
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button form="add-user-form" type="submit">Save</Button>
          </div>
        }
      >
        <form id="add-user-form" onSubmit={handleAddUser}>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label>
              Name<br />
              <input name="name" required placeholder="Jane Doe" />
            </label>
            <label>
              Email<br />
              <input type="email" name="email" required placeholder="jane@example.com" />
            </label>
            <label>
              City<br />
              <input name="city" placeholder="Pune" />
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
}
