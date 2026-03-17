export function formatDateUk(date: string): string {
   return new Intl.DateTimeFormat("uk-UA", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
   }).format(new Date(date));
}
