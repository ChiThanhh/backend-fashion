import express from "express";
import { ShipmentController } from "../controllers/shipmentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin: xem toàn bộ shipment
router.get("/", authMiddleware, ShipmentController.getAll);

// User/Admin: lấy shipment theo id
router.get("/:id", authMiddleware, ShipmentController.getById);

// User/Admin: lấy shipment theo order
router.get("/order/:orderId", authMiddleware, ShipmentController.getByOrder);

// Admin: tạo shipment mới
router.post("/", authMiddleware, ShipmentController.create);

// Admin: update shipment (status, tracking)
router.put("/:id", authMiddleware, ShipmentController.update);

// Admin: delete shipment
router.delete("/:id", authMiddleware, ShipmentController.delete);

export default router;
