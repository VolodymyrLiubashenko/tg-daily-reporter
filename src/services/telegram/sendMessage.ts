import axios from "axios";
import { env } from "../../config/env";

export async function sendTelegramMessage(text: string) {
   if (!env.telegramBotToken || !env.telegramChatId) {
      throw new Error("Telegram env variables not set");
   }

   const url = `https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`;

   try {
      const response = await axios.post(url, {
         chat_id: env.telegramChatId,
         text,
         parse_mode: "HTML",
      });

      return response.data;
   } catch (error) {
      if (axios.isAxiosError(error)) {
         const telegramError = error.response?.data;
         throw new Error(`Telegram API error: ${JSON.stringify(telegramError) || error.message}`);
      }

      throw error;
   }
}
