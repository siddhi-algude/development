// src/modules/user/user.service.ts
import prisma from "../../lib/prisma";
import { hashPassword } from "../../lib/password";

export const createUser = async (input: {
  email: string;
  username: string;
  password: string;
}) => {
  const passwordHash = await hashPassword(input.password);
  return prisma.user.create({
    data: {
      email: input.email, 
      username: input.username,
      passwordHash,
    },
  });
};

export const findUserByEmailOrUsername = async (identifier: string) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });
};

export const publicUser = (user: any) => {
  const { passwordHash, mfaSecret, ...rest } = user;
  return rest;
};
