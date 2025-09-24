import { Router } from "express";
import { AttributeController } from "../controllers/attributeController.js";

const router = Router();

router.get("/", AttributeController.getAll);
router.get("/:id", AttributeController.getById);
router.post("/", AttributeController.create);
router.put("/:id", AttributeController.update);
router.delete("/:id", AttributeController.delete);

export default router;
