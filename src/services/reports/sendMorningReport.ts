import { buildMorningReport } from "./buildMorningReport";
import { generateMorningPost } from "../openai/generateMorningPost";
import { sendTelegramMessage } from "../telegram/sendMessage";
import { getLastPosts, savePost } from "../../storage/postStorage";
import { getBotMessages } from "../bot/getBotMessages";
import { env } from "../../config/env";

export async function sendMorningReport() {
   const data = await buildMorningReport();

   const previousPosts = (await getBotMessages(env.telegramChatId || "", 10)).map((message) => message.message);

   const text = await generateMorningPost({
      muMatch: data.match,
      usdRate: data.usdCurrency.rate,
      rateDate: data.usdCurrency.date,
      eurRate: data.eurCurrency.rate,
      eurRateDate: data.eurCurrency.date,
      obolonMatch: data.obolonMatch,
      f1Race: data.f1Race
         ? {
              raceName: data.f1Race.raceName,
              formattedDate: data.f1Race.formattedDate,
              location: `${data.f1Race.circuitName}, ${data.f1Race.locality}, ${data.f1Race.country}`,
           }
         : null,
      previousPosts,
      beers: data.beers,
      isWeekend: data.isWeekend,
      weekday: data.weekday,
   });

   await sendTelegramMessage(text);

   // 💾 сохраняем пост
   savePost(text);

   return {
      text,
      data,
      previousPosts,
   };
}
