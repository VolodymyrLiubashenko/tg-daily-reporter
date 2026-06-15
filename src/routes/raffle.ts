import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import {
   getWeeklyWinnersController,
   pickWeeklyWinnerController,
} from "../controllers/raffleController";

const router = Router();

router.get("/pick-weekly-winner", asyncHandler(pickWeeklyWinnerController));
router.get("/weekly-winners", asyncHandler(getWeeklyWinnersController));

export default router;
