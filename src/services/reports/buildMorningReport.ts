import { getUsdToUahRate } from "../currency/getUsdToUahRate";
import { getNextManchesterUnitedMatch } from "../sports/getNextManchesterUnitedMatch";
import { formatKyivDateTime } from "../../utils/formatKyivDateTime";
import { formatDateUk } from "../../utils/formatDateUk";
import { getNextF1Race } from "../f1/getNextRace";
import { getTapBeerList } from "../beer/getTapBeerList";

export async function buildMorningReport() {
   const [currency, match, f1Race, beers] = await Promise.all([getUsdToUahRate(), getNextManchesterUnitedMatch(), getNextF1Race(), getTapBeerList()]);

   return {
      currency,
      match: {
         ...match,
         kyivDateTime: formatKyivDateTime(match.utcDate),
      },
      f1Race: {
         ...f1Race,
         formattedDate: formatDateUk(f1Race.date),
      },
      beers,
   };
}
