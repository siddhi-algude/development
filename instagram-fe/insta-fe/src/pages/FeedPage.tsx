// src/pages/FeedPage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { axiosClient } from "../api/axiosClient";
type MeUser = {
  id: string;
  email: string;
  username: string;
  role: string;
  isMfaEnabled: boolean;
};
const FeedPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [me, setMe] = useState<MeUser | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axiosClient.get("/auth/me");
        setMe(res.data.user);
      } catch (err) {
        console.error("Failed to load /auth/me", err);
      }
    };
    fetchMe();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Instaclone</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            {user?.username} ({user?.email})
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto mt-6">
        <h2 className="text-lg font-semibold mb-2">Feed (placeholder)</h2>
        <pre className="bg-white border rounded p-3 text-xs overflow-auto">
          {JSON.stringify(me, null, 2)}
        </pre>
        <p className="mt-4 text-sm text-gray-600">
          Here you can later render posts, stories, etc.
        </p>
      </main>
    </div>
  );
};

export default FeedPage;
