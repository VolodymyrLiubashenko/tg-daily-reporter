import { Request, Response } from "express";
import { buildMorningReport } from "../services/reports/buildMorningReport";
import { generateMorningPost } from "../services/openai/generateMorningPost";

import { getBotMessages } from "../services/bot/getBotMessages";
import { env } from "../config/env";

export async function getMorningTextPreview(_req: Request, res: Response) {
   const data = await buildMorningReport();

   const previousPosts = (await getBotMessages(env.telegramChatId || "", 10)).map((message) => message.message);

   const text = await generateMorningPost({
      muMatch: data.match,
      usdRate: data.usdCurrency.rate,
      rateDate: data.usdCurrency.date,
      eurRate: data.eurCurrency.rate,
      eurRateDate: data.eurCurrency.date,
      previousPosts: previousPosts,
      f1Race: data.f1Race
         ? {
              raceName: data.f1Race.raceName,
              formattedDate: data.f1Race.formattedDate,
              location: `${data.f1Race.circuitName}, ${data.f1Race.locality}, ${data.f1Race.country}`,
           }
         : null,
      beers: data.beers,
      isWeekend: data.isWeekend,
      weekday: data.weekday,
      obolonMatch: data.obolonMatch,
   });

   res.json({
      ok: true,
      text,
   });
}
