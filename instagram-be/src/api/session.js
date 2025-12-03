// src/api/session.js

const STORAGE_KEY = "insta_clone_auth"; // name as you like

export const getAuthSession = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const setAuthSession = (session) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  // If you want localStorage instead: localStorage.setItem(...)
};

export const clearAuthSession = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};
