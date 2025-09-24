import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { PriceController } from "../controllers/priceController.js";
import { getByColorAndSize } from "../controllers/priceController.js";

const router = express.Router();

router.get("/", PriceController.getAll);
router.get("/getprice", getByColorAndSize);
router.get("/:id", authMiddleware, PriceController.getById);
router.post("/", authMiddleware, PriceController.create);
router.put("/:id", authMiddleware, PriceController.update);
router.delete("/:id", authMiddleware, PriceController.delete);

export default router;
