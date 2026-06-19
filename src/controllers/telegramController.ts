import { Request, Response } from "express";
import { sendTelegramMessage } from "../services/telegram/sendMessage";
import { getUserAvatarFile } from "../services/telegram/getUserAvatarFile";
import { sendMessageByAdmin } from "../services/telegram/sendMessageByAdmin";
import { editAdminTelegramMessage } from "../services/openai/editAdminTelegramMessage";

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

export async function sendMessageByAdminController(req: Request, res: Response) {
   const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";

   if (!text) {
      return res.status(400).json({
         ok: false,
         message: "Message text is required",
      });
   }

   const result = await sendMessageByAdmin({ text });

   res.json({
      ok: true,
      message: "Message sent",
      result,
   });
}

export async function editMessageByAdminController(req: Request, res: Response) {
   const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";

   if (!text) {
      return res.status(400).json({
         ok: false,
         message: "Message text is required",
      });
   }

   const editedText = await editAdminTelegramMessage({ text });

   res.json({
      ok: true,
      message: "Message edited",
      editedText,
   });
}
