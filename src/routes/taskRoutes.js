import express from "express";
import {createTask, getTasks, updateTask, deleteTask,} from "../controllers/taskController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.patch("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export const taskRoutes = router;
