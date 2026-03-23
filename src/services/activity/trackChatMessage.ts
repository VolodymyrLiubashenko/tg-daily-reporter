import { ChatMessageModel } from "../../models/ChatMessage";
import { ChatUserModel } from "../../models/ChatUser";

type TTrackChatMessageInput = {
   chatId: string;
   telegramUserId: string;
   username?: string | null;
   firstName?: string | null;
   lastName?: string | null;
   isBot?: boolean;
   messageId: string;
   sentAt: Date;
};

export async function trackChatMessage(input: TTrackChatMessageInput) {
   const { chatId, telegramUserId, username = null, firstName = null, lastName = null, isBot = false, messageId, sentAt } = input;

   await ChatUserModel.findOneAndUpdate(
      { chatId, telegramUserId },
      {
         $set: {
            username,
            firstName,
            lastName,
            isBot,
            lastMessageAt: sentAt,
         },
         $inc: {
            messageCountTotal: 1,
         },
      },
      {
         upsert: true,
         new: true,
      }
   );

   await ChatMessageModel.create({
      chatId,
      telegramUserId,
      messageId,
      sentAt,
   });
}
