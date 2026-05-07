import { NextFunction, Request, Response } from "express";
import { formatErrorForLog } from "../utils/formatErrorForLog";

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
   console.error(formatErrorForLog(error));

   res.status(500).json({
      ok: false,
      message: "Internal server error",
   });
}
