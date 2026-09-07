import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./lib/prisma";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "AI Workspace backend is running",
  });
});

app.get("/api/db-test", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      status: "ok",
      message: "Database connection is working",
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});