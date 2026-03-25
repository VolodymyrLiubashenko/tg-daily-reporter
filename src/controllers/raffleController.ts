import { Request, Response } from "express";
import { pickWeeklyWinner } from "../services/raffle/pickWeeklyWinner";
import { env } from "../config/env";
import { getReportingPeriodPreviousSaturdayThroughNextSaturday } from "../utils/date";

export async function pickWeeklyWinnerController(req: Request, res: Response) {
   const chatId = String(req.body?.chatId || env.telegramChatId);

   const { startDate, endDate } = getReportingPeriodPreviousSaturdayThroughNextSaturday();

   const winner = await pickWeeklyWinner(chatId, startDate, endDate);

   return res.json({
      ok: true,
      chatId,
      startDate,
      endDate,
      winner,
   });
}
