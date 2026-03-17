import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getMorningReportPreview } from "../controllers/reportController";

const router = Router();

router.get("/morning-preview", asyncHandler(getMorningReportPreview));

export default router;
