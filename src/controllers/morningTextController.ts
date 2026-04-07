import { Request, Response } from "express";
import { buildMorningReport } from "../services/reports/buildMorningReport";
import { generateMorningPost } from "../services/openai/generateMorningPost";

import { getBotMessages } from "../services/bot/getBotMessages";
import { env } from "../config/env";

export async function getMorningTextPreview(_req: Request, res: Response) {
   const data = await buildMorningReport();

   const previousPosts = (await getBotMessages(env.telegramChatId || "", 10)).map((message) => message.message);

   const text = await generateMorningPost({
      opponent: data.match.opponent,
      matchDate: data.match.kyivDateTime,
      competition: data.match.competition,
      venue: data.match.venue,
      usdRate: data.currency.rate,
      rateDate: data.currency.date,
      previousPosts: previousPosts,
      f1RaceName: data.f1Race.raceName,
      f1RaceDate: data.f1Race.formattedDate,
      f1RaceLocation: `${data.f1Race.circuitName}, ${data.f1Race.locality}, ${data.f1Race.country}`,
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
