import { Request, Response } from "express";

import { getObolonNextMatch } from "../services/sports/getObolonNextMatch";

export async function getObolonNextMatchController(_req: Request, res: Response): Promise<void> {
   const match = await getObolonNextMatch();

   res.json({
      ok: true,
      match,
   });
}
