import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { VariantController } from "../controllers/variantController.js";

const router = express.Router();
router.post("/bulk-create", VariantController.bulkCreate);
router.put("/bulk-update", VariantController.bulkUpdate);

router.get("/", authMiddleware, VariantController.getAll);
router.get("/:id", authMiddleware, VariantController.getById);
router.get("/product/:id", authMiddleware, VariantController.getVariantByProduct);
router.post("/", authMiddleware, VariantController.create);
router.put("/:id", authMiddleware, VariantController.update);
router.delete("/:id", authMiddleware, VariantController.delete);
export default router;
