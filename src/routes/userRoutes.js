// src/routes/userRoutes.js
import { Router } from "express";
import { getMe, patchMe, getUserById, patchUserById, deleteUserById } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, patchMe);

// admin
router.get("/:id", authMiddleware, requireRole("admin"), getUserById);
router.put("/:id", authMiddleware, requireRole("admin"), patchUserById);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteUserById);

export default router;
