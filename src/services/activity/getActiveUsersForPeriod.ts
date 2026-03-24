import { ChatMessageModel } from "../../models/ChatMessage";
import { ChatUserModel } from "../../models/ChatUser";

export async function getActiveUsersForPeriod(chatId: string, startDate: Date, endDate: Date) {
   const aggregation = await ChatMessageModel.aggregate<{
      telegramUserId: string;
      messageCount: number;
   }>([
      {
         $match: {
            chatId,
            sentAt: {
               $gte: startDate,
               $lte: endDate,
            },
         },
      },
      {
         $group: {
            _id: "$telegramUserId",
            messageCount: { $sum: 1 },
         },
      },
      {
         $project: {
            _id: 0,
            telegramUserId: "$_id",
            messageCount: 1,
         },
      },
   ]);

   const userIds = aggregation.map((item) => item.telegramUserId);

   const users = await ChatUserModel.find({
      chatId,
      telegramUserId: { $in: userIds },
   }).lean();

   return aggregation.map((item) => {
      const user = users.find((u) => u.telegramUserId === item.telegramUserId);

      return {
         telegramUserId: item.telegramUserId,
         messageCount: item.messageCount,
         username: user?.username ?? null,
         firstName: user?.firstName ?? null,
         lastName: user?.lastName ?? null,
      };
   });
}
