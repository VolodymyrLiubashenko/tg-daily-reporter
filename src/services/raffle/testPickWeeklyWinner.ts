import { getActiveUsersForPeriod } from "../activity/getActiveUsersForPeriod";
import { pickRandomIndex } from "./pickRandomIndex";

export async function testPickWeeklyWinner(chatId: string, startDate: Date, endDate: Date) {
   const activeUsers = await getActiveUsersForPeriod(chatId, startDate, endDate);

   if (!activeUsers.length) {
      throw new Error("No active users found for selected period");
   }

   const randomSampleSize = 100;
   const randomIndexHistogram = Array.from({ length: activeUsers.length }, () => 0);

   for (let i = 0; i < randomSampleSize; i += 1) {
      const sampledIndex = pickRandomIndex(activeUsers.length);
      randomIndexHistogram[sampledIndex] += 1;
   }

   const randomIndex = pickRandomIndex(activeUsers.length);
   const winner = activeUsers[randomIndex];

   return {
      activeUsersCount: activeUsers.length,
      activeUsers,
      randomIndex,
      winner,
      randomSampleSize,
      randomIndexHistogram,
      minSampledIndex: randomIndexHistogram.findIndex((count) => count > 0),
      maxSampledIndex: randomIndexHistogram.reduce((lastIndex, count, index) => (count > 0 ? index : lastIndex), -1),
   };
}
