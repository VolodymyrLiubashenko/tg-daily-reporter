import { getUsdToUahRate } from "../currency/getUsdToUahRate";
import { getNextManchesterUnitedMatch } from "../sports/getNextManchesterUnitedMatch";
import { formatKyivDateTime } from "../../utils/formatKyivDateTime";
import { formatDateUk } from "../../utils/formatDateUk";
import { getNextF1Race } from "../f1/getNextRace";
import { getTapBeerList } from "../beer/getTapBeerList";
import { getWeekdayNameUk } from "../../utils/date";
import { getObolonNextMatch } from "../sports/getObolonNextMatch";

async function fromSource<T>(label: string, fn: () => Promise<T>): Promise<T> {
   try {
      return await fn();
   } catch (cause) {
      const msg = cause instanceof Error ? cause.message : String(cause);
      throw new Error(`${label}: ${msg}`);
   }
}

export async function buildMorningReport() {
   const [currency, match, f1Race, beers, obolonMatch] = await Promise.all([
      fromSource("NBU USD/UAH", getUsdToUahRate),
      getNextManchesterUnitedMatch(),
      fromSource("F1 next race", getNextF1Race),
      fromSource("Beer menu", getTapBeerList),
      getObolonNextMatch(),
   ]);
   const weekday = getWeekdayNameUk(new Date());
   const isWeekend = weekday === "Субота" || weekday === "Неділя";

   return {
      currency,
      match: match
         ? { ...match, kyivDateTime: formatKyivDateTime(match.utcDate) }
         : null,
      obolonMatch: obolonMatch
         ? { ...obolonMatch, kyivDateTime: formatKyivDateTime(obolonMatch.utcDate) }
         : null,
      f1Race: {
         ...f1Race,
         formattedDate: formatDateUk(f1Race.date),
      },
      beers,
      isWeekend,
      weekday,
   };
}
