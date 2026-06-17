import { Router } from "express";

import { env } from "../config/env";
import { passport } from "../config/passport";

const router = Router();

router.get(
   "/google",
   passport.authenticate("google", {
      scope: ["profile", "email"],
   })
);

router.get(
   "/google/callback",
   passport.authenticate("google", {
      failureRedirect: `${env.frontendUrl}/login`,
   }),
   (_req, res) => {
      res.redirect(`${env.frontendUrl}/`);
   }
);

router.get("/me", (req, res) => {
   res.json({
      ok: true,
      user: req.user ?? null,
   });
});

router.post("/logout", (req, res, next) => {
   req.logout((error) => {
      if (error) {
         return next(error);
      }

      req.session.destroy((sessionError) => {
         if (sessionError) {
            return next(sessionError);
         }

         res.clearCookie("connect.sid", {
            httpOnly: true,
            sameSite: env.nodeEnv === "production" ? "none" : "lax",
            secure: env.nodeEnv === "production",
         });

         res.json({ ok: true });
      });
   });
});

export default router;
