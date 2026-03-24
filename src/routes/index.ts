import { Router } from "express";
import telegramRoutes from "./telegram";
import reportsRoutes from "./reports";
import morningTextRoutes from "./morningText";
import sendMorningTestRoutes from "./sendMorning";
import telegramWebhookRoutes from "./telegramWebhook";
import activityRoutes from "./activity";
import raffleRoutes from "./raffle";

const router = Router();

router.get("/health", (_req, res) => {
   res.status(200).json({
      ok: true,
      message: "Server is running",
   });
});

router.use("/telegram", telegramRoutes);
router.use("/telegram", telegramWebhookRoutes);

router.use("/reports", reportsRoutes);

router.use("/reports", morningTextRoutes);

router.use("/reports", sendMorningTestRoutes);

router.use("/activity", activityRoutes);

router.use("/raffle", raffleRoutes);

export default router;
