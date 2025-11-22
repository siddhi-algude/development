import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-24 space-y-4">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
      <Link className="btn-primary" to="/">Go Home</Link>
    </div>
  );
}
