import express from "express";
import { RefundController } from "../controllers/refundController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin xem tất cả refunds
router.get("/", authMiddleware, RefundController.getAll);

// User/Admin xem refund theo id
router.get("/:id", authMiddleware, RefundController.getById);

// Xem refund theo return
router.get("/return/:returnId", authMiddleware, RefundController.getByReturn);

// Admin tạo refund
router.post("/", authMiddleware, RefundController.create);

// Admin update refund
router.put("/:id", authMiddleware, RefundController.update);

// Admin delete refund
router.delete("/:id", authMiddleware, RefundController.delete);

export default router;
