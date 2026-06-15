import { WeeklyWinnerModel } from "../../models/WeeklyWinner";

export async function getWeeklyWinners(chatId: string) {
   const winners = await WeeklyWinnerModel.find({ chatId })
      .sort({ pickedAt: -1, createdAt: -1 })
      .lean();

   return winners.map((winner) => ({
      id: String(winner._id),
      chatId: winner.chatId,
      telegramUserId: winner.telegramUserId,
      username: winner.username ?? null,
      firstName: winner.firstName ?? null,
      weekStart: winner.weekStart,
      weekEnd: winner.weekEnd,
      pickedAt: winner.pickedAt,
      createdAt: winner.createdAt,
      updatedAt: winner.updatedAt,
   }));
}
