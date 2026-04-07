import axios from "axios";
import * as cheerio from "cheerio";
import https from "https";

const httpsAgent = new https.Agent({
   rejectUnauthorized: false,
});

function normalizeText(value?: string | null) {
   return value?.replace(/\s+/g, " ").trim() || "";
}

export type TNextObolonMatch = {
   date: string;
   time: string;
   home: string;
   away: string;
   competition: string;
   season: string;
   venue: "home" | "away";
   opponent: string;
};

const OBOLON_GAMES_URL = "https://fc.obolon.ua/games/";
const TEAM_NAME = "Оболонь";

export async function getObolonNextMatch(): Promise<TNextObolonMatch> {
   const response = await axios.get<string>(OBOLON_GAMES_URL, {
      timeout: 15000,
      headers: {
         "User-Agent": "Mozilla/5.0",
      },
      httpsAgent,
   });

   const $ = cheerio.load(response.data);

   const row = $(".tb_fixtures.tb_matches.tb_fixtures-normal tbody tr:first-child");

   if (!row.length) {
      throw new Error("Next Obolon match row not found");
   }

   if (!row.length) {
      throw new Error("Next Obolon match row not found");
   }

   const date = normalizeText(row.find("td.date").text());
   const home = normalizeText(row.find("td.home").text());
   const away = normalizeText(row.find("td.away").text());
   const time = normalizeText(row.find("td.time").text());
   const competition = normalizeText(row.find("td.competition").text());
   const season = normalizeText(row.find("td.season").text());

   if (!date || !home || !away) {
      throw new Error("Failed to parse next Obolon match");
   }

   const isHome = home.toLowerCase().includes(TEAM_NAME.toLowerCase());

   return {
      date,
      time,
      home,
      away,
      competition,
      season,
      venue: isHome ? "home" : "away",
      opponent: isHome ? away : home,
   };
}
