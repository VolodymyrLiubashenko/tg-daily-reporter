import {
   TGetF1NextRaceResponse,
   TGetNextManchesterUnitedMatchResponse,
   TGetObolonNextMatchResponse,
} from "./sportApiTypes";
import { httpClient } from "../client";

export const sportApi = {
   getNextManchesterUnitedMatch: async () => {
      return await httpClient.get<TGetNextManchesterUnitedMatchResponse>(
         "/sports/manchester-united/next-match"
      );
   },
   getObolonNextMatch: async () => {
      return await httpClient.get<TGetObolonNextMatchResponse>("/sports/obolon/next-match");
   },
   getF1NextRace: async () => {
      return await httpClient.get<TGetF1NextRaceResponse>("/sports/f1/next-race");
   },
};
