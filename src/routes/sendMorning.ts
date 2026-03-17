import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendMorningTest } from "../controllers/sendMorningController";

const router = Router();

router.get("/send-morning-test", asyncHandler(sendMorningTest));

export default router;
