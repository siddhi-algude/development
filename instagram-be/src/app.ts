// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import rootRouter from "./routes";

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true, // allow cookies from frontend
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", rootRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
