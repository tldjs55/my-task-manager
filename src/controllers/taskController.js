import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user.id });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};
