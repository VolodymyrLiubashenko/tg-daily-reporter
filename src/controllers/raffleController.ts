import { Request, Response } from "express";
import { pickWeeklyWinner } from "../services/raffle/pickWeeklyWinner";
import { env } from "../config/env";
import { getReportingPeriodPreviousSaturdayThroughNextSaturday } from "../utils/date";
import { getWeeklyWinners } from "../services/raffle/getWeeklyWinners";
import { testPickWeeklyWinner } from "../services/raffle/testPickWeeklyWinner";

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

export async function getWeeklyWinnersController(req: Request, res: Response) {
   const chatId = String(req.query.chatId || env.telegramChatId);

   const winners = await getWeeklyWinners(chatId);

   return res.json({
      ok: true,
      chatId,
      count: winners.length,
      winners,
   });
}

export async function testPickWeeklyWinnerController(req: Request, res: Response) {
   const chatId = String(req.query.chatId || env.telegramChatId);

   const { startDate, endDate } = getReportingPeriodPreviousSaturdayThroughNextSaturday();
   const result = await testPickWeeklyWinner(chatId, startDate, endDate);

   return res.json({
      ok: true,
      chatId,
      startDate,
      endDate,
      ...result,
   });
}
