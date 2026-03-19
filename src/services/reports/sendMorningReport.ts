import { buildMorningReport } from "./buildMorningReport";
import { generateMorningPost } from "../openai/generateMorningPost";
import { sendTelegramMessage } from "../telegram/sendMessage";
import { getLastPosts, savePost } from "../../storage/postStorage";

export async function sendMorningReport() {
   const data = await buildMorningReport();

   const previousPosts = getLastPosts(10);

   const text = await generateMorningPost({
      opponent: data.match.opponent,
      matchDate: data.match.kyivDateTime,
      competition: data.match.competition,
      venue: data.match.venue,
      usdRate: data.currency.rate,
      rateDate: data.currency.date,
      f1RaceName: data.f1Race.raceName,
      f1RaceDate: data.f1Race.formattedDate,
      f1RaceLocation: `${data.f1Race.circuitName}, ${data.f1Race.locality}, ${data.f1Race.country}`,
      previousPosts,
      beers: data.beers,
   });

   await sendTelegramMessage(text);

   // 💾 сохраняем пост
   savePost(text);

   return {
      text,
      data,
   };
}
