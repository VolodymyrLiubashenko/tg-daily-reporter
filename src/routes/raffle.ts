import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import { pickWeeklyWinnerController } from "../controllers/raffleController";

const router = Router();

router.get("/pick-weekly-winner", asyncHandler(pickWeeklyWinnerController));

export default router;
