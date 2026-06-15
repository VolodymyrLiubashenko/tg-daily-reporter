import { IFullBeerInfo } from "@/declarations/beer";

export type TGetFullBeerInfoResponse = {
   ok: boolean;
   beers: IFullBeerInfo[];
};
