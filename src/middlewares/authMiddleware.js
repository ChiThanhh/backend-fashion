// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/userModel.js";
import { RoleModel } from "../models/roleModel.js";
dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Missing Authorization header" });
  const parts = header.split(" ");
  if (parts.length !== 2) return res.status(401).json({ message: "Malformed Authorization header" });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, ACCESS_SECRET);
    req.userId = payload.userId;
    const user = await UserModel.findById(req.userId);
    if (!user) return res.status(401).json({ message: "User not found" });
    const role = await RoleModel.findById(user.role_id);
    req.user = user;
    req.user.roles = role ? [role.code] : [];
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
}
