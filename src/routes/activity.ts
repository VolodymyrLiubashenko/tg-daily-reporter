import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import { getActiveUsersController } from "../controllers/activityController";

const router = Router();

router.get("/active-users", asyncHandler(getActiveUsersController));

export default router;
