import { WeeklyWinnerModel } from "../../models/WeeklyWinner";

export type TWeeklyWinnerLeaderboardRow = {
   label: string;
   wins: number;
};

type TAggregateRow = {
   telegramUserId: string;
   wins: number;
   username: string | null;
   firstName: string | null;
};

function buildDisplayLabel(username: string | null, firstName: string | null, telegramUserId: string): string {
   const u = username?.trim();
   if (u) {
      return `@${u}`;
   }
   const name = firstName?.trim();
   if (name) {
      return name;
   }
   return `користувач ${telegramUserId}`;
}

/**
 * Усі переможці чату з кількістю перемог (за даними WeeklyWinner), відсортовано за wins desc.
 */
export async function getWeeklyWinnerLeaderboard(chatId: string): Promise<TWeeklyWinnerLeaderboardRow[]> {
   const rows = await WeeklyWinnerModel.aggregate<TAggregateRow>([
      { $match: { chatId } },
      { $sort: { pickedAt: -1, createdAt: -1 } },
      {
         $group: {
            _id: "$telegramUserId",
            wins: { $sum: 1 },
            username: { $first: "$username" },
            firstName: { $first: "$firstName" },
         },
      },
      { $sort: { wins: -1, _id: 1 } },
      {
         $project: {
            _id: 0,
            telegramUserId: "$_id",
            wins: 1,
            username: 1,
            firstName: 1,
         },
      },
   ]);

   return rows.map((row) => ({
      label: buildDisplayLabel(row.username, row.firstName, row.telegramUserId),
      wins: row.wins,
   }));
}

/**
 * Фіксований текст списку для промпта / поста (без змін з боку моделі).
 */
export function formatLeaderboardPlaintext(rows: TWeeklyWinnerLeaderboardRow[]): string {
   return rows.map((row, index) => `${index + 1}. ${row.label} — ${row.wins}`).join("\n");
}
