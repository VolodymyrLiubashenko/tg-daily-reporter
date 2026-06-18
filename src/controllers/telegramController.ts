import { Request, Response } from "express";
import { sendTelegramMessage } from "../services/telegram/sendMessage";
import { getUserAvatarFile } from "../services/telegram/getUserAvatarFile";

export async function testTelegramMessage(_req: Request, res: Response) {
   const result = await sendTelegramMessage(`🍻 О, а подивіться, що в нас тепер є — апка TG Daily Reporter!

Тут можна швидко глянути найближчі матчі, гонки Формули 1, пивну карту та розіграші 👇
https://tg-daily-reporter.vercel.app/`);

   res.json({
      ok: true,
      message: "Message sent",
      result,
   });
}

export async function getTelegramUserAvatarController(req: Request, res: Response) {
   const telegramUserIdParam = req.params.telegramUserId;
   const telegramUserId = Array.isArray(telegramUserIdParam) ? telegramUserIdParam[0] : telegramUserIdParam;
   const avatar = await getUserAvatarFile(telegramUserId);

   if (!avatar) {
      res.status(404).json({
         ok: false,
         message: "Avatar not found",
      });
      return;
   }

   res.setHeader("Content-Type", avatar.contentType);
   res.setHeader("Cache-Control", "public, max-age=86400");
   avatar.stream.pipe(res);
}
