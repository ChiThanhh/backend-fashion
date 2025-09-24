import { Router } from "express";
import { WebhookController } from "../controllers/webhookController.js";

const router = Router();

router.get("/", WebhookController.getAll);
router.get("/:id", WebhookController.getById);

export default router;
