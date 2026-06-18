import { Readable } from "node:stream";
import axios from "axios";
import { env } from "../../config/env";
import { ChatUserModel } from "../../models/ChatUser";
import { getUserAvatar } from "./getUserAvatar";

type TTelegramAvatarFile = {
   contentType: string;
   stream: Readable;
};

export async function getUserAvatarFile(
   telegramUserId: string
): Promise<TTelegramAvatarFile | null> {
   if (!env.telegramBotToken) {
      return null;
   }

   const user = await ChatUserModel.findOne({ telegramUserId }).sort({ updatedAt: -1 }).lean();
   let avatarFilePath = user?.avatarFilePath ?? null;

   if (!avatarFilePath) {
      const avatar = await getUserAvatar(telegramUserId);

      if (!avatar?.avatarFilePath) {
         console.info("Telegram user avatar file not found", {
            telegramUserId,
            hasChatUser: Boolean(user),
         });

         return null;
      }

      avatarFilePath = avatar.avatarFilePath;

      await ChatUserModel.updateMany(
         { telegramUserId },
         {
            $set: {
               avatarFileId: avatar.avatarFileId,
               avatarFileUniqueId: avatar.avatarFileUniqueId,
               avatarFilePath: avatar.avatarFilePath,
            },
         }
      );
   }

   const fileUrl = `https://api.telegram.org/file/bot${env.telegramBotToken}/${avatarFilePath}`;
   const response = await axios.get<Readable>(fileUrl, {
      responseType: "stream",
   });

   return {
      contentType: response.headers["content-type"] ?? "application/octet-stream",
      stream: response.data,
   };
}
