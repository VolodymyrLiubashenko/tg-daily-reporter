import { Router } from "express";

import { getF1NextRaceController } from "../controllers/f1NextRaceController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/next-race", asyncHandler(getF1NextRaceController));

export default router;
