export type TChatUser = {
   telegramUserId: string;
   username: string | null;
   firstName: string | null;
   lastName: string | null;
   avatarFileId: string | null;
   avatarFileUniqueId: string | null;
   avatarFilePath: string | null;
   isBot: boolean;
   lastMessageAt: string | null;
   messageCountTotal: number;
   createdAt: string;
   updatedAt: string;
};
