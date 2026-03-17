import { Request, Response } from "express";
import { sendTelegramMessage } from "../services/telegram/sendMessage";

export async function testTelegramMessage(_req: Request, res: Response) {
   const result = await sendTelegramMessage("🚀 Telegram bot connection works!");

   res.json({
      ok: true,
      message: "Message sent",
      result,
   });
}
