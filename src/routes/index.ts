import { Router } from "express";
import telegramRoutes from "./telegram";
import reportsRoutes from "./reports";
import morningTextRoutes from "./morningText";
import sendMorningTestRoutes from "./sendMorning";
import telegramWebhookRoutes from "./telegramWebhook";
import activityRoutes from "./activity";
import raffleRoutes from "./raffle";
import sentDrawBeerPostRoutes from "./sentDrawBeerPost";
import sendRaffleResultRoutes from "./sendRaffleResult";
import authRoutes from "./auth";
import manchesterUnitedNextMatchRoutes from "./manchesterUnitedNextMatch";
import obolonNextMatchRoutes from "./obolonNextMatch";
import f1NextRaceRoutes from "./f1NextRace";
import fullBeerInfoRoutes from "./fullBeerInfo";

const router = Router();

router.get("/health", (_req, res) => {
   res.status(200).json({
      ok: true,
      message: "Server is running",
   });
});

router.use("/auth", authRoutes);

router.use("/sports/manchester-united", manchesterUnitedNextMatchRoutes);

router.use("/sports/obolon", obolonNextMatchRoutes);

router.use("/sports/f1", f1NextRaceRoutes);

router.use("/beer", fullBeerInfoRoutes);

router.use("/telegram", telegramRoutes);
router.use("/telegram", telegramWebhookRoutes);

router.use("/reports", reportsRoutes);

router.use("/reports", morningTextRoutes);

router.use("/reports", sendMorningTestRoutes);

router.use("/activity", activityRoutes);

router.use("/raffle", raffleRoutes);

router.use("/raffle", sendRaffleResultRoutes);

router.use("/draw-beer", sentDrawBeerPostRoutes);

export default router;
