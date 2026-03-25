import { Request, Response } from "express";
import { generateDrawBeerPost } from "../services/openai/generateDrawBeerPost";
import { env } from "../config/env";
import { getActiveUsersForPeriod } from "../services/activity/getActiveUsersForPeriod";
import { sendTelegramMessage } from "../services/telegram/sendMessage";
import { getReportingPeriodPreviousSaturdayThroughNextSaturday } from "../utils/date";

export async function sendDrawBeerPostController(req: Request, res: Response) {
   const secret = req.headers["x-cron-secret"];

   if (!env.sendReportSecret || secret !== env.sendReportSecret) {
      return res.status(403).json({
         ok: false,
         message: "Forbidden",
      });
   }

   const chatId = env.telegramChatId || "";
   const { startDate, endDate } = getReportingPeriodPreviousSaturdayThroughNextSaturday();
   const activeUsers = await getActiveUsersForPeriod(chatId, startDate, endDate);

   const post = await generateDrawBeerPost({ activeUsers });

   await sendTelegramMessage(post);

   res.json({
      ok: true,
      activeUsers,
      post,
      startDate,
      endDate,
   });
}
