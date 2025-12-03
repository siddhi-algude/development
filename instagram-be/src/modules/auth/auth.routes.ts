// src/modules/auth/auth.routes.ts
import { Router } from "express";
import {
  loginHandler,
  refreshHandler,
  registerHandler,
  logoutHandler,
} from "./auth.controller";
import { requireAuth } from "../../middleware/authMiddleware";
import { prisma } from "../../lib/prisma";
import { publicUser } from "../user/user.service";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/refresh", refreshHandler);
router.post("/logout", logoutHandler);

// Test protected endpoint: returns current user
router.get("/me", requireAuth, async (req: any, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ user: publicUser(user) });
});

export default router;
