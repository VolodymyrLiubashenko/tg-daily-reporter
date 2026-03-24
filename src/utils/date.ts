const kyivWeekdayFormatter = new Intl.DateTimeFormat("uk-UA", {
   timeZone: "Europe/Kyiv",
   weekday: "long",
});

/** Назва дня тижня українською, напр. «Понеділок», «Вівторок». */
export function getWeekdayNameUk(date: Date): string {
   const raw = kyivWeekdayFormatter.format(date);
   return raw.charAt(0).toLocaleUpperCase("uk-UA") + raw.slice(1);
}
