import { Router } from "express";

import { getObolonNextMatchController } from "../controllers/obolonNextMatchController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/next-match", asyncHandler(getObolonNextMatchController));

export default router;
