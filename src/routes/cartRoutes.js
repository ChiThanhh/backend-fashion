import express from "express";
import { CartController } from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Lấy giỏ hàng của user hiện tại
router.get("/", authMiddleware, CartController.getAll);

// Lấy giỏ hàng theo ID (admin hoặc user check)
router.get("/:id", authMiddleware, CartController.getById);

// Tạo giỏ hàng mới
router.post("/", authMiddleware, CartController.create);

// Cập nhật số lượng item trong giỏ
router.put("/:id", authMiddleware, CartController.update);

// Xóa item trong giỏ
router.delete("/:id", authMiddleware, CartController.delete);

export default router;
