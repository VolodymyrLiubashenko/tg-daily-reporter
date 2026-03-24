import { WeeklyWinnerModel } from "../../models/WeeklyWinner";
import { ChatMessageModel } from "../../models/ChatMessage";
import { getActiveUsersForPeriod } from "../activity/getActiveUsersForPeriod";

export async function pickWeeklyWinner(chatId: string, startDate: Date, endDate: Date) {
   const activeUsers = await getActiveUsersForPeriod(chatId, startDate, endDate);

   if (!activeUsers.length) {
      throw new Error("No active users found for selected period");
   }

   const randomIndex = Math.floor(Math.random() * activeUsers.length);
   const winner = activeUsers[randomIndex];

   await WeeklyWinnerModel.create({
      chatId,
      telegramUserId: winner.telegramUserId,
      username: winner.username,
      firstName: winner.firstName,
      weekStart: startDate,
      weekEnd: endDate,
   });

   await ChatMessageModel.deleteMany({ chatId });

   return winner;
}
