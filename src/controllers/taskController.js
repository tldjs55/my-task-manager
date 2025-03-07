import { Task } from "../models/Task.js";
import { canCreateTask } from "../services/taskService.js";

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!(await canCreateTask(req.user.id))) {
      return res.status(403).json({ message: "You have reached the maximum number of tasks" });
    }

    const task = await Task.create({
      title,
      completed: false,
      user: req.user.id, // 將任務關聯到當前使用者
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = await Task.findOne({ _id: id, user: req.user.id });

  if (!task) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
  }

  await task.updateOne({ completed });
  res.status(200).json({ message: "Task updated successfully" });
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user.id });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
