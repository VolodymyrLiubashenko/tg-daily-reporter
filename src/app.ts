import express from "express";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { passport } from "./config/passport";
import { env } from "./config/env";
import session from "express-session";
import cors from "cors";

export const app = express();
app.set("trust proxy", 1);

app.use(express.json());

app.use(
   cors({
      origin: env.frontendUrl,
      credentials: true,
   })
);

app.use(
   session({
      secret: env.sessionSecret ?? "",
      resave: false,
      saveUninitialized: false,
      cookie: {
         httpOnly: true,
         sameSite: env.nodeEnv === "production" ? "none" : "lax",
         secure: env.nodeEnv === "production",
      },
   })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.use((_req, res) => {
   res.status(404).json({
      ok: false,
      message: "Route not found",
   });
});

app.use(errorHandler);
