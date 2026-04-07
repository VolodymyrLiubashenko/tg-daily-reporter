import { getObolonNextMatch } from "../services/sports/getObolonNextMatch";
import { Response } from "express";
import { Request } from "express";

export async function getObolonData(_req: Request, res: Response): Promise<void> {
   const match = await getObolonNextMatch();
   res.json({
      ok: true,
      match,
   });
}
