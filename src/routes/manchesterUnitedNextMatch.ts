import { Router } from "express";

import { getManchesterUnitedNextMatchController } from "../controllers/manchesterUnitedNextMatchController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/next-match", asyncHandler(getManchesterUnitedNextMatchController));

export default router;
