// src/routes/roleRoutes.js
import { Router } from "express";
import { listRoles, createRole, patchRole, deleteRole, assignRole } from "../controllers/roleController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const router = Router();

// role management (only admin)
router.get("/", authMiddleware, requireRole("admin"), listRoles);
router.post("/", authMiddleware, requireRole("admin"), createRole);
router.put("/:id", authMiddleware, requireRole("admin"), patchRole);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteRole);

// assign role to user (admin)
router.post("/assign/:userId", authMiddleware, requireRole("admin"), assignRole);

export default router;
