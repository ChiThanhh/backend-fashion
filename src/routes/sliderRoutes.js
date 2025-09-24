import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { SliderController } from "../controllers/sliderController.js";

const router = express.Router();

router.get("/", SliderController.getAll);
router.get("/:id", authMiddleware, SliderController.getById);
router.post("/", authMiddleware, SliderController.create);
router.put("/:id", authMiddleware, SliderController.update);
router.delete("/:id", authMiddleware, SliderController.delete);

export default router;
