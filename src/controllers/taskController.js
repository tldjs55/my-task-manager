import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    // 手動從 req.body 取出必要的欄位，避免不必要的資料進入
    const { title, completed } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // 建立 Task，並指定 user
    const task = await Task.create({
      title,
      completed: completed || false, // 預設值為 false
      user: req.user.id, // 確保任務關聯到當前使用者
    });
    
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  console.log(tasks);
  res.json(tasks);
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user.id }); // 確保該任務屬於使用者

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};