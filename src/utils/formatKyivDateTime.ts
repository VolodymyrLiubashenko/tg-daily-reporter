export function formatKyivDateTime(utcDate: string): string {
   return new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   }).format(new Date(utcDate));
}
