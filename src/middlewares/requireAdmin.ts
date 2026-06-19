import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";

type AuthUser = {
   email?: string;
};

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
   const userEmail = (req.user as AuthUser | undefined)?.email?.toLowerCase();

   if (!userEmail) {
      return res.status(401).json({
         ok: false,
         message: "Unauthorized",
      });
   }

   if (!env.adminEmails.includes(userEmail)) {
      return res.status(403).json({
         ok: false,
         message: "Forbidden",
      });
   }

   return next();
}
