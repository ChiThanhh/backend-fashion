import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ProductController } from "../controllers/productController.js";

const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/", authMiddleware, ProductController.create);
router.put("/:id", authMiddleware, ProductController.update);
router.delete("/:id", authMiddleware, ProductController.delete);

export default router;
