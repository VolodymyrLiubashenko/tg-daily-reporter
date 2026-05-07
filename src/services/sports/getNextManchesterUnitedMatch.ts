import axios from "axios";
import https from "node:https";
import { env } from "../../config/env";

/** Prefer IPv4: on some hosts AAAA is broken and TLS to api.football-data.org never completes (`res: null`). */
const footballDataHttpsAgent = new https.Agent({ family: 4 });

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

export async function getNextManchesterUnitedMatch(): Promise<TNextMatch | null> {
   if (!env.footballDataApiToken) {
      console.warn("[getNextManchesterUnitedMatch] FOOTBALL_DATA_API_TOKEN is not set");
      return null;
   }

   const url = `https://api.football-data.org/v4/teams/${env.manchesterUnitedTeamId}/matches?status=SCHEDULED&limit=1`;

   try {
      const response = await axios.get<TFootballDataResponse>(url, {
         timeout: 15000,
         httpsAgent: footballDataHttpsAgent,
         headers: {
            "X-Auth-Token": env.footballDataApiToken,
         },
      });

      const match = response.data?.matches?.[0];

      if (!match?.utcDate || !match.homeTeam?.name || !match.awayTeam?.name) {
         return null;
      }

      const isHome = match.homeTeam.name === "Manchester United FC";

      return {
         opponent: isHome ? match.awayTeam.name : match.homeTeam.name,
         utcDate: match.utcDate,
         competition: match.competition?.name || "Unknown competition",
         venue: isHome ? "home" : "away",
      };
   } catch (err) {
      const detail = axios.isAxiosError(err)
         ? `HTTP ${String(err.response?.status)}: ${JSON.stringify(err.response?.data ?? err.message)}`
         : err instanceof Error
           ? err.message
           : String(err);
      console.warn(`[getNextManchesterUnitedMatch] failed — ${detail}`);
      return null;
   }
}
