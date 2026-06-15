import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import { getActiveUsersController, getChatUsersController } from "../controllers/activityController";

const router = Router();

router.get("/active-users", asyncHandler(getActiveUsersController));
router.get("/users", asyncHandler(getChatUsersController));

export default router;
