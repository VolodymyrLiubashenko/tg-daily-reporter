import { Request, Response } from "express";
import { sendMorningReport } from "../services/reports/sendMorningReport";
import { env } from "../config/env";

export async function sendMorningTest(req: Request, res: Response) {
   const secret = req.headers["x-cron-secret"];

   if (!env.sendReportSecret || secret !== env.sendReportSecret) {
      return res.status(403).json({
         ok: false,
         message: "Forbidden",
      });
   }

   const result = await sendMorningReport();

   res.json({
      ok: true,
      ...result,
   });
}
