import { Request, Response } from "express";
import { pickWeeklyWinner } from "../services/raffle/pickWeeklyWinner";
import { env } from "../config/env";

export async function pickWeeklyWinnerController(req: Request, res: Response) {
   const chatId = String(req.body?.chatId || env.telegramChatId);

   const startDate = new Date();
   const endDate = new Date();

   startDate.setDate(startDate.getDate() - 7);

   const winner = await pickWeeklyWinner(chatId, startDate, endDate);

   return res.json({
      ok: true,
      chatId,
      startDate,
      endDate,
      winner,
   });
}
