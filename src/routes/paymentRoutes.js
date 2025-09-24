import express from "express";
import { PaymentController } from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // nếu cần auth


const router = express.Router();

// Public/Authenticated actions depending on your policy:
// Lấy tất cả payments (admin)
router.get("/", authMiddleware,PaymentController.getAll);

// Lấy payment theo id (admin or owner)
router.get("/:id", authMiddleware, PaymentController.getById);

// Lấy payments theo order
router.get("/order/:orderId", authMiddleware, PaymentController.getByOrder);

// Tạo payment (khi checkout / callback)
router.post("/", authMiddleware, PaymentController.create);

// Update payment (ví dụ cập nhật status từ webhook)
router.put("/:id", authMiddleware,PaymentController.update);

// Xóa payment (admin)
router.delete("/:id", authMiddleware, PaymentController.delete);

export default router;
