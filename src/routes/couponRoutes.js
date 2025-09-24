import { Router } from "express";
import { CouponController } from "../controllers/couponController.js";

const router = Router();

router.get("/", CouponController.getAll);
router.get("/:id", CouponController.getById);
router.post("/", CouponController.create);
router.put("/:id", CouponController.update);
router.delete("/:id", CouponController.delete);

export default router;
