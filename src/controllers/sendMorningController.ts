import { Request, Response } from "express";
import { sendMorningReport } from "../services/reports/sendMorningReport";

export async function sendMorningTest(_req: Request, res: Response) {
   const result = await sendMorningReport();

   res.json({
      ok: true,
      ...result,
   });
}
