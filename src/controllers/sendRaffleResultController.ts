import { Request, Response } from "express";
import { generateRaffleWinnerPost } from "../services/openai/generateRaffleWinnerPost";
import { sendTelegramMessage } from "../services/telegram/sendMessage";
import { env } from "../config/env";
import { getReportingPeriodPreviousSaturdayThroughNextSaturday } from "../utils/date";
import { pickWeeklyWinner } from "../services/raffle/pickWeeklyWinner";
import { getTapBeerList } from "../services/beer/getTapBeerList";
import {
   formatLeaderboardPlaintext,
   getWeeklyWinnerLeaderboard,
} from "../services/raffle/getWeeklyWinnerLeaderboard";

export async function sendRaffleResultController(req: Request, res: Response) {
   const secret = req.headers["x-cron-secret"];

   if (!env.sendReportSecret || secret !== env.sendReportSecret) {
      return res.status(403).json({
         ok: false,
         message: "Forbidden",
      });
   }

   const { startDate, endDate } = getReportingPeriodPreviousSaturdayThroughNextSaturday();

   const chatId = env.telegramChatId || "";

   const winner = await pickWeeklyWinner(chatId, startDate, endDate);

   const leaderboardRows = await getWeeklyWinnerLeaderboard(chatId);
   const leaderboardPlaintext = formatLeaderboardPlaintext(leaderboardRows);

   const beers = await getTapBeerList();
   const prizeBeerName = beers[Math.floor(Math.random() * beers.length)].name;

   const post = await generateRaffleWinnerPost({
      winner,
      prizeBeerName,
      leaderboardPlaintext,
   });

   await sendTelegramMessage(post);

   res.json({
      ok: true,
      winner,
      prizeBeerName,
      post,
      startDate,
      endDate,
   });
}
