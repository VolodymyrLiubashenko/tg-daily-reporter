import axios from "axios";
import { env } from "../../config/env";

export type TNextMatch = {
   opponent: string;
   utcDate: string;
   competition: string;
   venue: "home" | "away";
};

type TFootballDataMatch = {
   utcDate: string;
   competition?: {
      name?: string;
   };
   homeTeam?: {
      name?: string;
   };
   awayTeam?: {
      name?: string;
   };
};

type TFootballDataResponse = {
   matches?: TFootballDataMatch[];
};

export async function getNextManchesterUnitedMatch(): Promise<TNextMatch> {
   if (!env.footballDataApiToken) {
      throw new Error("FOOTBALL_DATA_API_TOKEN is not set");
   }

   const url = `https://api.football-data.org/v4/teams/${env.manchesterUnitedTeamId}/matches?status=SCHEDULED&limit=1`;

   const response = await axios.get<TFootballDataResponse>(url, {
      timeout: 15000,
      headers: {
         "X-Auth-Token": env.footballDataApiToken,
      },
   });

   const match = response.data?.matches?.[0];

   if (!match?.utcDate || !match.homeTeam?.name || !match.awayTeam?.name) {
      throw new Error("Failed to get next Manchester United match");
   }

   const isHome = match.homeTeam.name === "Manchester United FC";

   return {
      opponent: isHome ? match.awayTeam.name : match.homeTeam.name,
      utcDate: match.utcDate,
      competition: match.competition?.name || "Unknown competition",
      venue: isHome ? "home" : "away",
   };
}
