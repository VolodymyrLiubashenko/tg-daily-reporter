import { ChatUserModel } from "../../models/ChatUser";

export async function getChatUsers(chatId: string) {
   const users = await ChatUserModel.find({ chatId })
      .sort({ lastMessageAt: -1, createdAt: -1 })
      .lean();

   return users.map((user) => ({
      telegramUserId: user.telegramUserId,
      username: user.username ?? null,
      firstName: user.firstName ?? null,
      lastName: user.lastName ?? null,
      isBot: user.isBot,
      lastMessageAt: user.lastMessageAt ?? null,
      messageCountTotal: user.messageCountTotal,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
   }));
}
