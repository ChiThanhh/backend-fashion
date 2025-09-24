import { Router } from "express";
import { InventoryController } from "../controllers/inventoryController.js";

const router = Router();

router.get("/", InventoryController.getAll);

router.get("/:variantId/:warehouseId", InventoryController.getById);

router.post("/", InventoryController.create);

router.put("/:variantId/:warehouseId", InventoryController.update);

router.delete("/:variantId/:warehouseId", InventoryController.delete);

export default router;
