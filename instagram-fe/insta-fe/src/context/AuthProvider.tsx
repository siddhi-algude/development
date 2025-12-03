
// src/context/AuthContext.tsx
import React, { useEffect, useState, useCallback } from "react";
import { axiosClient } from "../api/axiosClient";

import {
  getAuthSession,
  setAuthSession,
  clearAuthSession,
} from "../api/session";

import type { AuthSession } from "../api/session";

import { AuthContext } from "./AuthContext";


type User = AuthSession["user"];

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (input: { emailOrUsername: string; password: string }) => Promise<void>;
  register: (input: {
    email: string;
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}; 
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Bootstrap: restore session from sessionStorage OR try refresh
  useEffect(() => {
    const bootstrap = async () => {
      const existing = getAuthSession();
      if (existing) {
        setUser(existing.user);
        setAccessToken(existing.accessToken);
        setLoading(false);
        return;
      }

      // Try refresh using cookie-based refresh token
      try {
        const res = await axiosClient.post("/auth/refresh");
        const newSession: AuthSession = {
          accessToken: res.data.tokens.accessToken,
          user: res.data.user,
        };
        setAuthSession(newSession);
        setUser(newSession.user);
        setAccessToken(newSession.accessToken);
      } catch {
        clearAuthSession();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = useCallback(
    async (input: { emailOrUsername: string; password: string }) => {
      const res = await axiosClient.post("/auth/login", input);
      const session: AuthSession = {
        accessToken: res.data.tokens.accessToken,
        user: res.data.user,
      };
      setAuthSession(session);
      setUser(session.user);
      setAccessToken(session.accessToken);
    },
    []
  );

  const register = useCallback(
    async (input: { email: string; username: string; password: string }) => {
      const res = await axiosClient.post("/auth/register", input);
      const session: AuthSession = {
        accessToken: res.data.tokens.accessToken,
        user: res.data.user,
      };
      setAuthSession(session);
      setUser(session.user);
      setAccessToken(session.accessToken);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await axiosClient.post("/auth/logout");
    } catch {
      // ignore
    } finally {
      clearAuthSession();
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  const value: AuthContextType = {
    user,
    accessToken,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
 