import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendRaffleResultController } from "../controllers/sendRaffleResultController";

const router = Router();

router.post("/send-raffle-result", asyncHandler(sendRaffleResultController));

export default router;
