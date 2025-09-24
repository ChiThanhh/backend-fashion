import express from "express";
import { CategoryController } from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id",authMiddleware, CategoryController.getById);
router.post("/",authMiddleware, CategoryController.create);
router.put("/:id",authMiddleware, CategoryController.update);
router.delete("/:id",authMiddleware, CategoryController.delete);

export default router;
