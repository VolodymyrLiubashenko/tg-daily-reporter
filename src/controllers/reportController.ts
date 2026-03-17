import { Request, Response } from "express";

import { buildMorningReport } from "../services/reports/buildMorningReport";

export async function getMorningReportPreview(_req: Request, res: Response) {
   const data = await buildMorningReport();

   res.json({
      ok: true,
      data,
   });
}
