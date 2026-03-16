import express from "express";
import { env } from "./config/env";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.listen(env.port, () => {
   console.log(`Server started on port ${env.port}`);
});
