import type { TChatUser } from "@/declarations/chatUser";

export type TGetChatUsersResponse = {
   ok: boolean;
   chatId: string;
   count: number;
   users: TChatUser[];
};
