import axios from "axios";

/** `all` includes every competition; `fixture=true` selects upcoming matches. */
const ESPN_MU_FIXTURES_URL =
   "https://site.api.espn.com/apis/site/v2/sports/soccer/all/teams/360/schedule?fixture=true";

const MU_TEAM_ID = "360";

export type TNextMatch = {
   opponent: string;
   utcDate: string;
   competition: string;
   venue: "home" | "away";
};

type TEspnCompetitor = {
   id?: string;
   homeAway?: "home" | "away";
   team?: {
      displayName?: string;
   };
};

type TEspnEvent = {
   date?: string;
   competitions?: Array<{
      date?: string;
      competitors?: TEspnCompetitor[];
      status?: {
         type?: {
            state?: string;
            completed?: boolean;
         };
      };
   }>;
   league?: {
      name?: string;
   };
};

type TEspnScheduleResponse = {
   events?: TEspnEvent[];
};

function eventKickoffMs(e: TEspnEvent): number {
   const raw = e.date ?? e.competitions?.[0]?.date;
   if (!raw) {
      return NaN;
   }
   const t = new Date(raw).getTime();
   return Number.isNaN(t) ? NaN : t;
}

function involvesManUnited(e: TEspnEvent): boolean {
   const competitors = e.competitions?.[0]?.competitors ?? [];
   return competitors.some((c) => c.id === MU_TEAM_ID);
}

function isFutureFixture(e: TEspnEvent, nowMs: number): boolean {
   const kickoff = eventKickoffMs(e);
   if (Number.isNaN(kickoff) || kickoff <= nowMs) {
      return false;
   }
   const st = e.competitions?.[0]?.status?.type;
   if (st?.completed === true || st?.state === "post") {
      return false;
   }
   return true;
}

export async function getNextManchesterUnitedMatch(): Promise<TNextMatch | null> {
   try {
      const response = await axios.get<TEspnScheduleResponse>(ESPN_MU_FIXTURES_URL, {
         timeout: 15000,
      });

      const events = response.data?.events ?? [];
      const nowMs = Date.now();

      const upcoming = events
         .filter((e) => involvesManUnited(e) && isFutureFixture(e, nowMs))
         .sort((a, b) => eventKickoffMs(a) - eventKickoffMs(b));

      const next = upcoming[0];
      const utcDate = next?.date ?? next?.competitions?.[0]?.date;

      if (!next || !utcDate) {
         return null;
      }

      const competitors = next.competitions?.[0]?.competitors ?? [];
      const muCompetitor = competitors.find((c) => c.id === MU_TEAM_ID);
      const opponent = competitors.find((c) => c.id !== MU_TEAM_ID);

      if (!muCompetitor || !opponent?.team?.displayName) {
         return null;
      }

      return {
         opponent: opponent.team.displayName,
         utcDate,
         competition: next.league?.name ?? "Футбол",
         venue: muCompetitor.homeAway ?? "home",
      };
   } catch (err) {
      const detail = axios.isAxiosError(err)
         ? `HTTP ${String(err.response?.status)}: ${JSON.stringify(err.response?.data ?? err.message)}`
         : err instanceof Error
           ? err.message
           : String(err);
      console.warn(`[getNextManchesterUnitedMatch] ESPN API failed — ${detail}`);
      return null;
   }
}
