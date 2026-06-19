import { sendTelegramMessage } from "./sendMessage";

type SendMessageByAdminInput = {
   text: string;
};

export async function sendMessageByAdmin(input: SendMessageByAdminInput) {
   const text = input.text.trim();

   if (!text) {
      throw new Error("Message text is required");
   }

   return await sendTelegramMessage(text);
}
