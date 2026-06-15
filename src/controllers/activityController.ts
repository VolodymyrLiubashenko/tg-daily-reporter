import { Request, Response } from "express";
import { getActiveUsersForPeriod } from "../services/activity/getActiveUsersForPeriod";
import { env } from "../config/env";
import { getReportingPeriodPreviousSaturdayThroughNextSaturday } from "../utils/date";
import { getChatUsers } from "../services/activity/getChatUsers";

export async function getActiveUsersController(req: Request, res: Response) {
   const chatId = String(req.query.chatId || env.telegramChatId);

   const { startDate, endDate } = getReportingPeriodPreviousSaturdayThroughNextSaturday();

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

export async function getChatUsersController(req: Request, res: Response) {
   const chatId = String(req.query.chatId || env.telegramChatId);

   const users = await getChatUsers(chatId);

   return res.json({
      ok: true,
      chatId,
      count: users.length,
      users,
   });
}
