import { getObolonNextMatch } from "../services/sports/getObolonNextMatch";
import { Response } from "express";
import { Request } from "express";

export async function getObolonData(_req: Request, res: Response): Promise<void> {
   const match = await getObolonNextMatch(); // TNextObolonMatch | null when fetch/parse fails
   res.json({
      ok: true,
      match,
   });
}
