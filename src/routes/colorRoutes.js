import express from "express";
import { ColorController } from "../controllers/colorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",authMiddleware, ColorController.getAll);
router.get("/:id",authMiddleware, ColorController.getById);
router.post("/",authMiddleware, ColorController.create);
router.put("/:id",authMiddleware, ColorController.update);
router.delete("/:id",authMiddleware, ColorController.delete);

export default router;
