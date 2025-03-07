import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./src/config/db.js";
import { authRoutes } from "./src/routes/authRoutes.js";
import { taskRoutes } from "./src/routes/taskRoutes.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();

// 中介軟體
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// 設定路由
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 啟動伺服器
const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
