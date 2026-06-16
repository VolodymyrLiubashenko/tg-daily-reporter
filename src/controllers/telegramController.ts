import { Request, Response } from "express";
import { sendTelegramMessage } from "../services/telegram/sendMessage";

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
