// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login({ emailOrUsername, password });
      navigate("/", { replace: true });
    } catch (err: unknown) {
    const axiosError = err as {
      response?: { data?: { message?: string } };
    };

    setError(
      axiosError.response?.data?.message ||
        "Login failed. Please check your credentials."
    );
  } finally {
      setSubmitting(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-slate-100">
     <div className="auth-container">
      <div className="w-full max-w-sm bg-white border rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Instaclone Login</h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full border px-3 py-2 text-sm rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 text-sm rounded"
            required
          />
          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="auth-btn"     >
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>

      </div>
    </div>
    </div>
  );
};

export default LoginPage;
