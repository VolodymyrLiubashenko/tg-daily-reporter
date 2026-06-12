import dayjs from "dayjs";
import "dayjs/locale/uk";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const KYIV_TIMEZONE = "Europe/Kyiv";

export function parseKyivDate(date: string | Date) {
   return dayjs(date).tz(KYIV_TIMEZONE).locale("uk");
}

export function formatKyivMatchDate(date: string | Date) {
   return parseKyivDate(date).format("D MMMM YYYY, dddd");
}

/** Дата гонки F1 у форматі `YYYY-MM-DD` без часу. */
export function formatKyivRaceDate(date: string) {
   return parseKyivDate(`${date}T12:00:00`).format("D MMMM YYYY, dddd");
}

export function formatKyivMatchTime(date: string | Date) {
   const kickoff = parseKyivDate(date);

   return {
      time: kickoff.format("HH:mm"),
      timezone: kickoff.format("z"),
   };
}

export function getCurrentYear() {
   return dayjs().year();
}
