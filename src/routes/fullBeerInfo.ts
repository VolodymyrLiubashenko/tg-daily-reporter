import { Router } from "express";

import { getFullBeerInfoController } from "../controllers/fullBeerInfoController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/full-info", asyncHandler(getFullBeerInfoController));

export default router;
