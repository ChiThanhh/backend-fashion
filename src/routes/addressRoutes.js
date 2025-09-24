// src/routes/addressRoutes.js
import { Router } from "express";
import { listAddresses, createAddress, patchAddress, deleteAddress } from "../controllers/addressController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/me/addresses", authMiddleware, listAddresses);
router.post("/me/addresses", authMiddleware, createAddress);
router.put("/me/addresses/:id", authMiddleware, patchAddress);
router.delete("/me/addresses/:id", authMiddleware, deleteAddress);

export default router;
