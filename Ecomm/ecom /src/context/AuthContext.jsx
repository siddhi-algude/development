// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const OTP_CODE = "123456"; // mock OTP

const USERS_KEY = "swiftkart_users_v1";
const CURRENT_USER_KEY = "swiftkart_current_user_v1";

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(null); // { mode: "login" | "signup", user }
  const [error, setError] = useState(null);

  // load current user on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const requestSignup = (form) => {
    const users = loadUsers();
    const exists = users.some((u) => u.email === form.email);

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields.");
      return false;
    }

    if (exists) {
      setError("An account with this email already exists. Please login.");
      return false;
    }

    setPending({ mode: "signup", user: form });
    setError(null);
    return true;
  };

  const requestLogin = (email, password) => {
    const users = loadUsers();
    const existing = users.find((u) => u.email === email);

    if (!existing || existing.password !== password) {
      setError("Invalid email or password.");
      return false;
    }

    setPending({ mode: "login", user: existing });
    setError(null);
    return true;
  };

  const verifyOtp = (inputOtp) => {
    if (!pending) {
      setError("No OTP request in progress.");
      return false;
    }

    if (inputOtp !== OTP_CODE) {
      setError("Incorrect OTP. Use 123456 for mock login.");
      return false;
    }

    let finalUser = pending.user;
    if (pending.mode === "signup") {
      // Save new user in "database"
      const users = loadUsers();
      const withId = { ...pending.user, id: Date.now() };
      users.push(withId);
      saveUsers(users);
      finalUser = withId;
    }

    // Set logged in user
    setUser(finalUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(finalUser));

    // Clear pending + error
    setPending(null);
    setError(null);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const value = {
    user,
    error,
    pending, // contains mode + user
    requestSignup,
    requestLogin,
    verifyOtp,
    logout,
    otpCode: OTP_CODE, // handy for showing hint in UI
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
