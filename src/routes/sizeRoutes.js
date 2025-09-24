import express from "express";
import { SizeController } from "../controllers/sizeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",authMiddleware, SizeController.getAll);
router.get("/:id",authMiddleware, SizeController.getById);
router.post("/",authMiddleware, SizeController.create);
router.put("/:id",authMiddleware, SizeController.update);
router.delete("/:id",authMiddleware, SizeController.delete);

export default router;
