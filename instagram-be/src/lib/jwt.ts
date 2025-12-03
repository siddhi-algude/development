// src/lib/jwt.ts
import * as jwt from "jsonwebtoken";
import { env } from "../config/env";

export type JwtAccessPayload = {
  sub: string;
  email: string;
  role: string;
};

export type JwtRefreshPayload = {
  sub: string;
  sessionId: string;
};

export const signAccessToken = (payload: JwtAccessPayload): string => {
  return jwt.sign(payload, env.jwtAccessSecret as string, {
    expiresIn: env.jwtAccessExpiresIn,
  });
};

export const signRefreshToken = (payload: JwtRefreshPayload): string => {
  return jwt.sign(payload, env.jwtRefreshSecret as string, {
    expiresIn: `${env.jwtRefreshExpiresInDays}d`,
  });
};

export const verifyAccessToken = (token: string): JwtAccessPayload => {
  return jwt.verify(token, env.jwtAccessSecret as string) as JwtAccessPayload;
};

export const verifyRefreshToken = (token: string): JwtRefreshPayload => {
  return jwt.verify(token, env.jwtRefreshSecret as string) as JwtRefreshPayload;
};
