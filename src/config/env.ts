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

   SEND_REPORT_SECRET: z.string().optional(),

   MONGODB_URI: z.string().optional(),
   MONGODB_DB_NAME: z.string().optional(),
});

const parsedEnv = envSchema.parse(process.env);

/** Leading/trailing whitespace from hosting UIs often breaks auth headers. */
function trimEnv(value: string | undefined): string | undefined {
   if (value === undefined) {
      return undefined;
   }
   const t = value.trim();
   return t === "" ? undefined : t;
}

export const env = {
   port: parsedEnv.PORT,
   nodeEnv: parsedEnv.NODE_ENV,

   telegramBotToken: trimEnv(parsedEnv.TELEGRAM_BOT_TOKEN),
   telegramChatId: trimEnv(parsedEnv.TELEGRAM_CHAT_ID),

   footballDataApiToken: trimEnv(parsedEnv.FOOTBALL_DATA_API_TOKEN),
   manchesterUnitedTeamId: trimEnv(parsedEnv.MANCHESTER_UNITED_TEAM_ID) ?? "66",

   openaiApiKey: trimEnv(parsedEnv.OPENAI_API_KEY),

   enableCron: parsedEnv.ENABLE_CRON,
   cronTime: trimEnv(parsedEnv.CRON_TIME) ?? "0 8 * * *",

   sendReportSecret: trimEnv(parsedEnv.SEND_REPORT_SECRET),

   mongoDbUri: trimEnv(parsedEnv.MONGODB_URI),
   mongoDbName: trimEnv(parsedEnv.MONGODB_DB_NAME),
};
