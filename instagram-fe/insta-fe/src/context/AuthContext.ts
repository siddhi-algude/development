import { createContext } from "react";
import type { AuthContextType } from "./AuthProvider";

// Context only (no components) → Fixes react-refresh rule
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
