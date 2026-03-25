const kyivWeekdayFormatter = new Intl.DateTimeFormat("uk-UA", {
   timeZone: "Europe/Kyiv",
   weekday: "long",
});

/** Назва дня тижня українською, напр. «Понеділок», «Вівторок». */
export function getWeekdayNameUk(date: Date): string {
   const raw = kyivWeekdayFormatter.format(date);
   return raw.charAt(0).toLocaleUpperCase("uk-UA") + raw.slice(1);
}

/**
 * Період для звіту: від попередньої суботи 00:00:00 до кінця наступної після неї суботи
 * 23:59:59.999 (локальний час сервера). Якщо сьогодні субота, «попередня субота» — сім днів назад.
 */
export function getReportingPeriodPreviousSaturdayThroughNextSaturday(referenceDate: Date = new Date()): {
   startDate: Date;
   endDate: Date;
} {
   const calendarDayAtMidnight = new Date(referenceDate);
   calendarDayAtMidnight.setHours(0, 0, 0, 0);

   const dayOfWeekWithSundayAsZero = calendarDayAtMidnight.getDay();
   const numberOfDaysFromPreviousSaturdayToToday = dayOfWeekWithSundayAsZero === 6 ? 7 : (dayOfWeekWithSundayAsZero + 1) % 7;

   const startDate = new Date(calendarDayAtMidnight);
   startDate.setDate(startDate.getDate() - numberOfDaysFromPreviousSaturdayToToday);

   const endDate = new Date(startDate);
   endDate.setDate(endDate.getDate() + 7);
   endDate.setHours(23, 59, 59, 999);

   return {
      startDate,
      endDate,
   };
}
