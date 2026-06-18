import axios from "axios";
import { env } from "../../config/env";

type TTelegramPhotoSize = {
   file_id: string;
   file_unique_id: string;
   width: number;
   height: number;
   file_size?: number;
};

type TTelegramUserProfilePhotosResponse = {
   ok: boolean;
   result?: {
      total_count: number;
      photos: TTelegramPhotoSize[][];
   };
};

type TTelegramFileResponse = {
   ok: boolean;
   result?: {
      file_id: string;
      file_unique_id: string;
      file_path?: string;
   };
};

export type TTelegramUserAvatar = {
   avatarFileId: string;
   avatarFileUniqueId: string;
   avatarFilePath: string | null;
};

function getLargestPhotoSize(photoSizes: TTelegramPhotoSize[]) {
   return [...photoSizes].sort((a, b) => b.width * b.height - a.width * a.height)[0] ?? null;
}

export async function getUserAvatar(
   telegramUserId: string
): Promise<TTelegramUserAvatar | null | undefined> {
   if (!env.telegramBotToken) {
      console.warn("Telegram user avatar lookup skipped: TELEGRAM_BOT_TOKEN is not configured", {
         telegramUserId,
      });

      return undefined;
   }

   const apiBaseUrl = `https://api.telegram.org/bot${env.telegramBotToken}`;

   try {
      const photosResponse = await axios.get<TTelegramUserProfilePhotosResponse>(
         `${apiBaseUrl}/getUserProfilePhotos`,
         {
            params: {
               user_id: telegramUserId,
               limit: 1,
            },
         }
      );

      const latestPhoto = photosResponse.data.result?.photos[0];
      const largestPhoto = latestPhoto ? getLargestPhotoSize(latestPhoto) : null;

      if (!largestPhoto) {
         console.info("Telegram user avatar not found", {
            telegramUserId,
         });

         return null;
      }

      const fileResponse = await axios.get<TTelegramFileResponse>(`${apiBaseUrl}/getFile`, {
         params: {
            file_id: largestPhoto.file_id,
         },
      });

      const avatar = {
         avatarFileId: largestPhoto.file_id,
         avatarFileUniqueId: largestPhoto.file_unique_id,
         avatarFilePath: fileResponse.data.result?.file_path ?? null,
      };

      console.info("Telegram user avatar loaded", {
         telegramUserId,
         hasFilePath: Boolean(avatar.avatarFilePath),
      });

      return avatar;
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.warn("Failed to load Telegram user avatar", {
            telegramUserId,
            message: error.message,
            response: error.response?.data,
         });

         return undefined;
      }

      throw error;
   }
}
