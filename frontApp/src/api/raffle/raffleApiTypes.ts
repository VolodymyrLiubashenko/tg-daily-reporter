import type { TWeeklyWinner } from "@/declarations/weeklyWinner";

export type TGetWeeklyWinnersResponse = {
   ok: boolean;
   chatId: string;
   count: number;
   winners: TWeeklyWinner[];
};
