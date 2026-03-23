import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { handleTelegramWebhook } from "../controllers/telegramWebhookController";

const router = Router();

router.post("/webhook", asyncHandler(handleTelegramWebhook));

export default router;
