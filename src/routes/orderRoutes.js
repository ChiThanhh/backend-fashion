import express from "express";
import { OrderController } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all orders
router.get("/", authMiddleware, OrderController.getAll);

// Get order by id
router.get("/:id", authMiddleware, OrderController.getById);

// Create order
router.post("/", authMiddleware, OrderController.create);

// Update order
router.put("/:id", authMiddleware, OrderController.update);

// Delete order
router.delete("/:id", authMiddleware, OrderController.delete);

export default router;
