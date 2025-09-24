import express from "express";
import { BrandController } from "../controllers/brandController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",authMiddleware, BrandController.getAll);
router.get("/:id",authMiddleware, BrandController.getById);
router.post("/",authMiddleware, BrandController.create);
router.put("/:id",authMiddleware, BrandController.update);
router.delete("/:id",authMiddleware, BrandController.delete);

export default router;
