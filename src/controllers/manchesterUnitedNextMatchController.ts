import { Request, Response } from "express";

import { getNextManchesterUnitedMatch } from "../services/sports/getNextManchesterUnitedMatch";

export async function getManchesterUnitedNextMatchController(
   _req: Request,
   res: Response
): Promise<void> {
   const match = await getNextManchesterUnitedMatch();

   res.json({
      ok: true,
      match,
   });
}
