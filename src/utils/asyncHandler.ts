import { NextFunction, Request, Response } from "express";

type TAsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export function asyncHandler(handler: TAsyncRouteHandler) {
   return (req: Request, res: Response, next: NextFunction) => {
      handler(req, res, next).catch(next);
   };
}
