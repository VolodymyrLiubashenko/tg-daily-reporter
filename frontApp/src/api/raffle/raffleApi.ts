import { httpClient } from "../client";
import type { TGetWeeklyWinnersResponse } from "./raffleApiTypes";

export async function getWeeklyWinners() {
   return await httpClient.get<TGetWeeklyWinnersResponse>("/raffle/weekly-winners");
}
