import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user.id });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  console.log(tasks);
  res.json(tasks);
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // 從請求參數中取得 task 的 ID
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};