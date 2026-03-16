import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
   PORT: z.coerce.number().default(3000),
   NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
   port: parsedEnv.PORT,
   nodeEnv: parsedEnv.NODE_ENV,
};
