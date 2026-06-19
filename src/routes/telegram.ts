import { Router } from "express";
import {
   editMessageByAdminController,
   getTelegramUserAvatarController,
   sendMessageByAdminController,
   testTelegramMessage,
} from "../controllers/telegramController";
import { asyncHandler } from "../utils/asyncHandler";
import { requireAdmin } from "../middlewares/requireAdmin";

const router = Router();

router.get("/test", asyncHandler(testTelegramMessage));
router.post("/admin/send-message", requireAdmin, asyncHandler(sendMessageByAdminController));
router.post("/admin/edit-message", requireAdmin, asyncHandler(editMessageByAdminController));
router.get("/users/:telegramUserId/avatar", asyncHandler(getTelegramUserAvatarController));

export default router;
