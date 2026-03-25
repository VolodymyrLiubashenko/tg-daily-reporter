import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { sendDrawBeerPostController } from "../controllers/sendDrawBeerPostController";

const router = Router();

router.post("/send-post", asyncHandler(sendDrawBeerPostController));

export default router;
