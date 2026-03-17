import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
   PORT: z.coerce.number().default(3000),
   NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

   // Telegram
   TELEGRAM_BOT_TOKEN: z.string().optional(),
   TELEGRAM_CHAT_ID: z.string().optional(),

   FOOTBALL_DATA_API_TOKEN: z.string().optional(),
   MANCHESTER_UNITED_TEAM_ID: z.string().default("66"),

   OPENAI_API_KEY: z.string().optional(),

   ENABLE_CRON: z
      .string()
      .default("true")
      .transform((value) => value === "true"),
   CRON_TIME: z.string().default("0 8 * * *"),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
   port: parsedEnv.PORT,
   nodeEnv: parsedEnv.NODE_ENV,

   telegramBotToken: parsedEnv.TELEGRAM_BOT_TOKEN,
   telegramChatId: parsedEnv.TELEGRAM_CHAT_ID,

   footballDataApiToken: parsedEnv.FOOTBALL_DATA_API_TOKEN,
   manchesterUnitedTeamId: parsedEnv.MANCHESTER_UNITED_TEAM_ID,

   openaiApiKey: parsedEnv.OPENAI_API_KEY,

   enableCron: parsedEnv.ENABLE_CRON,
   cronTime: parsedEnv.CRON_TIME,
};
