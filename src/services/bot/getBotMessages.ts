import { BotMessageModel } from "../../models/BotMessage";

export async function getBotMessages(chatId: string, limit: number = 10) {
   const lastLimitMessages = await BotMessageModel.find({ chatId }).sort({ createdAt: -1 }).limit(limit);
   return lastLimitMessages;
}
