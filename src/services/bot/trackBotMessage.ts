import { BotMessageModel, TBotMessage } from "../../models/BotMessage";

export async function trackBotMessage(input: TBotMessage) {
   const { chatId, message, sentAt } = input;

   await BotMessageModel.create({
      chatId,
      message,
      sentAt,
   });
}
