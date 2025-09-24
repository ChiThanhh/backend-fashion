import { Router } from "express";
import { AttributeValueController } from "../controllers/attributeValueController.js";

const router = Router();

router.get("/", AttributeValueController.getAll);
router.get("/:id", AttributeValueController.getById);
router.get("/attributes/:id", AttributeValueController.getByAttributeId);
router.post("/", AttributeValueController.create);
router.put("/:id", AttributeValueController.update);
router.delete("/:id", AttributeValueController.delete);

export default router;
