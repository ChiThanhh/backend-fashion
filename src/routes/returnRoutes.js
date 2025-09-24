import express from "express";
import { ReturnController } from "../controllers/returnController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin xem toàn bộ returns
router.get("/", authMiddleware, ReturnController.getAll);

// User/Admin: xem return theo id
router.get("/:id", authMiddleware, ReturnController.getById);

// User/Admin: lấy returns theo order
router.get("/order/:orderId", authMiddleware, ReturnController.getByOrder);

// User tạo yêu cầu return
router.post("/", authMiddleware, ReturnController.create);

// Admin update status return
router.put("/:id", authMiddleware, ReturnController.update);

// Admin delete return
router.delete("/:id", authMiddleware, ReturnController.delete);

export default router;
