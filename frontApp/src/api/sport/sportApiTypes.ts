import { IManchesterUnitedNextMatch, IObolonNextMatch, IF1NextRace } from "@/declarations/sport";
/**
 * Response types
 */

type TSportApiResponse<T> = {
   ok: boolean;
   match: T;
};

export type TGetNextManchesterUnitedMatchResponse = TSportApiResponse<IManchesterUnitedNextMatch | null>;

export type TGetObolonNextMatchResponse = TSportApiResponse<IObolonNextMatch | null>;

type TF1ApiResponse = {
   ok: boolean;
   race: IF1NextRace | null;
};

export type TGetF1NextRaceResponse = TF1ApiResponse;
