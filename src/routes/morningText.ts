import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getMorningTextPreview } from "../controllers/morningTextController";

const router = Router();

router.get("/morning-text-preview", asyncHandler(getMorningTextPreview));

export default router;
