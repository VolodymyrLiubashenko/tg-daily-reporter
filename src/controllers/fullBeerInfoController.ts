import { Request, Response } from "express";

import { getFullBeerInfo } from "../services/beer/getFullBeerInfo";

export async function getFullBeerInfoController(_req: Request, res: Response): Promise<void> {
   const beers = await getFullBeerInfo();

   res.json({
      ok: true,
      beers,
   });
}
