import { Router } from "express";
import { getTelegramUserAvatarController, testTelegramMessage } from "../controllers/telegramController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/test", asyncHandler(testTelegramMessage));
router.get("/users/:telegramUserId/avatar", asyncHandler(getTelegramUserAvatarController));

export default router;
