import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  res.json({ message: "User registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
};
