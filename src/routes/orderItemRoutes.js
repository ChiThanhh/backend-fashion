import express from "express";
import { OrderItemController } from "../controllers/orderItemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all order items
router.get("/", authMiddleware, OrderItemController.getAll);

// Get order item by id
router.get("/:id", authMiddleware, OrderItemController.getById);

// Get all items of a specific order
router.get("/order/:orderId", authMiddleware, OrderItemController.getByOrder);

// Create order item
router.post("/", authMiddleware, OrderItemController.create);

// Update order item
router.put("/:id", authMiddleware, OrderItemController.update);

// Delete order item
router.delete("/:id", authMiddleware, OrderItemController.delete);

export default router;
