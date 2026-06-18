import { ChatMessageModel } from "../../models/ChatMessage";
import { ChatUserModel } from "../../models/ChatUser";
import { getUserAvatar } from "../telegram/getUserAvatar";

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
   const avatar = await getUserAvatar(telegramUserId);
   const userFieldsToSet: Record<string, unknown> = {
      username,
      firstName,
      lastName,
      isBot,
      lastMessageAt: sentAt,
   };

   if (avatar !== undefined) {
      userFieldsToSet.avatarFileId = avatar?.avatarFileId ?? null;
      userFieldsToSet.avatarFileUniqueId = avatar?.avatarFileUniqueId ?? null;
      userFieldsToSet.avatarFilePath = avatar?.avatarFilePath ?? null;
   }

   await ChatUserModel.findOneAndUpdate(
      { chatId, telegramUserId },
      {
         $set: userFieldsToSet,
         $inc: {
            messageCountTotal: 1,
         },
      },
      {
         upsert: true,
         new: true,
      },
   ).lean();

   await ChatMessageModel.create({
      chatId,
      telegramUserId,
      messageId,
      sentAt,
   });
}
