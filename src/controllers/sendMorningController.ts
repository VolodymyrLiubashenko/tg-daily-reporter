import { Request, Response } from "express";
import { sendMorningReport } from "../services/reports/sendMorningReport";
import { env } from "../config/env";
import { trackBotMessage } from "../services/bot/trackBotMessage";

export async function sendMorningTest(req: Request, res: Response) {
   const secret = req.headers["x-cron-secret"];

   if (!env.sendReportSecret || secret !== env.sendReportSecret) {
      return res.status(403).json({
         ok: false,
         message: "Forbidden",
      });
   }

   const result = await sendMorningReport();

   const sentAt = new Date();

   await trackBotMessage({
      chatId: env.telegramChatId || "",
      message: result.text,
      sentAt,
      theme: "morning",
   });

   res.json({
      ok: true,
      ...result,
   });
}
