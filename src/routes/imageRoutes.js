import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ImageController } from "../controllers/imageController.js";

const router = express.Router();

router.get("/", authMiddleware, ImageController.getAll);
router.get("/:id", authMiddleware, ImageController.getById);
router.post("/", authMiddleware, ImageController.create);
router.put("/:id", authMiddleware, ImageController.update);
router.delete("/:id", authMiddleware, ImageController.delete);

export default router;
