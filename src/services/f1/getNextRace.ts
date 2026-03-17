import axios from "axios";

export type TF1NextRace = {
   raceName: string;
   circuitName: string;
   locality: string;
   country: string;
   date: string;
};

type TJolpicaRace = {
   raceName: string;
   date: string;
   Circuit: {
      circuitName: string;
      Location: {
         locality: string;
         country: string;
      };
   };
};

type TJolpicaResponse = {
   MRData?: {
      RaceTable?: {
         Races?: TJolpicaRace[];
      };
   };
};

export async function getNextF1Race(): Promise<TF1NextRace> {
   const url = "https://api.jolpi.ca/ergast/f1/current/next.json";

   const response = await axios.get<TJolpicaResponse>(url, {
      timeout: 15000,
   });

   const race = response.data?.MRData?.RaceTable?.Races?.[0];

   if (!race?.raceName || !race?.date || !race?.Circuit?.circuitName || !race?.Circuit?.Location?.locality || !race?.Circuit?.Location?.country) {
      throw new Error("Failed to get next F1 race");
   }

   return {
      raceName: race.raceName,
      circuitName: race.Circuit.circuitName,
      locality: race.Circuit.Location.locality,
      country: race.Circuit.Location.country,
      date: race.date,
   };
}
