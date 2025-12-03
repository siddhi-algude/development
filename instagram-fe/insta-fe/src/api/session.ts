// src/api/session.ts

const STORAGE_KEY = "insta_auth_session";

export type AuthSession = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
    isMfaEnabled: boolean;
  };
};

export const getAuthSession = (): AuthSession | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
};

export const setAuthSession = (session: AuthSession) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

export const clearAuthSession = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};
 