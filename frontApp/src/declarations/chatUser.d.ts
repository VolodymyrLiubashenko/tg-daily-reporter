export type TChatUser = {
   telegramUserId: number;
   username: string | null;
   firstName: string | null;
   lastName: string | null;
   isBot: boolean;
   lastMessageAt: string | null;
   messageCountTotal: number;
   createdAt: string;
   updatedAt: string;
};
