import { Request, Response } from "express";
import { generateRaffleWinnerPost } from "../services/openai/generateRaffleWinnerPost";
import { sendTelegramMessage } from "../services/telegram/sendMessage";
import { env } from "../config/env";
import { getReportingPeriodPreviousSaturdayThroughNextSaturday } from "../utils/date";
import { pickWeeklyWinner } from "../services/raffle/pickWeeklyWinner";

export async function sendRaffleResultController(req: Request, res: Response) {
   const secret = req.headers["x-cron-secret"];

   if (!env.sendReportSecret || secret !== env.sendReportSecret) {
      return res.status(403).json({
         ok: false,
         message: "Forbidden",
      });
   }

   const { startDate, endDate } = getReportingPeriodPreviousSaturdayThroughNextSaturday();

   const winner = await pickWeeklyWinner(env.telegramChatId || "", startDate, endDate);

   const post = await generateRaffleWinnerPost({ winner });

   await sendTelegramMessage(post);

   res.json({
      ok: true,
      winner,
      post,
      startDate,
      endDate,
   });
}
