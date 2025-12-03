// src/modules/auth/auth.types.ts
export type RegisterInput = {
  email: string;
  username: string;
  password: string;
};

export type LoginInput = {
  emailOrUsername: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string; // only for server-side cookie use
};

export type AuthResponse = {
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
    isMfaEnabled: boolean;
  };
  tokens: AuthTokens;
};
