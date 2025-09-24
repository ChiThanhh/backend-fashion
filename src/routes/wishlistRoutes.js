import express from "express";
import { WishlistController } from "../controllers/wishlistController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Lấy wishlist của user hiện tại
router.get("/", authMiddleware, WishlistController.getAll);

// Lấy wishlist theo ID
router.get("/:id", authMiddleware, WishlistController.getById);

// Tạo wishlist mới
router.post("/", authMiddleware, WishlistController.create);

// Thêm item vào wishlist
router.put("/:id", authMiddleware, WishlistController.update);

// Xóa item khỏi wishlist
router.delete("/:id", authMiddleware, WishlistController.delete);

export default router;
