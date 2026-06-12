import { Request, Response } from "express";

import { getNextF1Race } from "../services/f1/getNextRace";

export async function getF1NextRaceController(_req: Request, res: Response): Promise<void> {
   const race = await getNextF1Race();

   res.json({
      ok: true,
      race,
   });
}
