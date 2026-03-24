import { Request, Response } from "express";
import { getActiveUsersForPeriod } from "../services/activity/getActiveUsersForPeriod";
import { env } from "../config/env";

export async function getActiveUsersController(req: Request, res: Response) {
   const chatId = String(req.query.chatId || env.telegramChatId);

   const startDate = new Date();
   const endDate = new Date();

   startDate.setDate(startDate.getDate() - 7);

   const activeUsers = await getActiveUsersForPeriod(chatId, startDate, endDate);

   return res.json({
      ok: true,
      chatId,
      startDate,
      endDate,
      count: activeUsers.length,
      users: activeUsers,
   });
}
