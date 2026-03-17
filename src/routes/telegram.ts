import { Router } from "express";
import { testTelegramMessage } from "../controllers/telegramController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/test", asyncHandler(testTelegramMessage));

export default router;
