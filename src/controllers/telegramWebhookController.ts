import { Request, Response } from "express";
import { trackChatMessage } from "../services/activity/trackChatMessage";

export async function handleTelegramWebhook(req: Request, res: Response) {
   const update = req.body;

   const message = update?.message;

   if (message?.chat?.id && message?.from?.id && message?.message_id) {
      await trackChatMessage({
         chatId: String(message.chat.id),
         telegramUserId: String(message.from.id),
         username: message.from.username ?? null,
         firstName: message.from.first_name ?? null,
         lastName: message.from.last_name ?? null,
         isBot: Boolean(message.from.is_bot),
         messageId: String(message.message_id),
         sentAt: new Date(message.date * 1000),
      });
   }

   res.json({ ok: true });
}
