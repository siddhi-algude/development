// src/modules/auth/auth.service.ts

import prisma from "../../lib/prisma";

import { verifyPassword } from "../../lib/password";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../lib/jwt";
import {
  RegisterInput,
  LoginInput,
  AuthResponse,
} from "./auth.types";
import {
  createUser,
  findUserByEmailOrUsername,
  publicUser,
} from "../user/user.service";
import { env } from "../../config/env";
import crypto from "crypto";
import bcrypt from "bcrypt";

const REFRESH_TOKEN_SALT_ROUNDS = 12;

const hashRefreshToken = async (token: string) => {
  return bcrypt.hash(token, REFRESH_TOKEN_SALT_ROUNDS);
};

const verifyRefreshTokenHash = async (token: string, hash: string) => {
  return bcrypt.compare(token, hash);
};

export const register = async (
  input: RegisterInput
): Promise<AuthResponse> => {
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email: input.email }, { username: input.username }],
    },
  });

  if (existing) {
    throw new Error("User with email or username already exists");
  }

  const user = await createUser(input);
  return createSessionForUser(user.id);
};

export const login = async (
  input: LoginInput
): Promise<AuthResponse> => {
  const user = await findUserByEmailOrUsername(input.emailOrUsername);
  if (!user) throw new Error("Invalid credentials");

  const passwordOk = await verifyPassword(input.password, user.passwordHash);
  if (!passwordOk) throw new Error("Invalid credentials");

  return createSessionForUser(user.id);
};

export const createSessionForUser = async (
  userId: string
): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  const sessionId = crypto.randomUUID();

  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = signRefreshToken({
    sub: user.id,
    sessionId,
  });

  const refreshTokenHash = await hashRefreshToken(refreshToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + env.jwtRefreshExpiresInDays);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      refreshTokenHash,
      expiresAt,
      valid: true,
    },
  });

  return {
    user: publicUser(user),
    tokens: {
      accessToken, 
      refreshToken, // controller will put this in HttpOnly cookie
    },
  };
};

export const refreshSession = async (
  refreshToken: string
): Promise<AuthResponse> => {
  const payload = verifyRefreshToken(refreshToken);

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  });

  if (!session || !session.valid) {
    throw new Error("Invalid session");
  }

  if (session.expiresAt < new Date()) {
    throw new Error("Session expired");
  }

  const isValidHash = await verifyRefreshTokenHash(
    refreshToken,
    session.refreshTokenHash
  );

  if (!isValidHash) {
    throw new Error("Invalid session");
  }

  const newAccessToken = signAccessToken({
    sub: session.user.id,
    email: session.user.email,
    role: session.user.role,
  });

  const newSessionId = crypto.randomUUID();

  const newRefreshToken = signRefreshToken({
    sub: session.user.id,
    sessionId: newSessionId,
  });

  const newRefreshTokenHash = await hashRefreshToken(newRefreshToken);

  const newExpiresAt = new Date();
  newExpiresAt.setDate(newExpiresAt.getDate() + env.jwtRefreshExpiresInDays);

  await prisma.$transaction([
    prisma.session.update({
      where: { id: session.id },
      data: { valid: false },
    }),
    prisma.session.create({
      data: {
        id: newSessionId,
        userId: session.user.id,
        refreshTokenHash: newRefreshTokenHash,
        expiresAt: newExpiresAt,
        valid: true,
      },
    }),
  ]);

  return {
    user: publicUser(session.user),
    tokens: {
      accessToken: newAccessToken, 
       refreshToken, // controller will put this in HttpOnly cookie
    },
  };
};

export const logoutSession = async (sessionId: string) => {
  await prisma.session.updateMany({
    where: { id: sessionId },
    data: { valid: false },
  });
};
