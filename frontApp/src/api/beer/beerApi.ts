import { httpClient } from "../client";
import { TGetFullBeerInfoResponse } from "./beerApiTypes";

export async function getFullBeerInfo() {
   return await httpClient.get<TGetFullBeerInfoResponse>("/beer/full-info");
}
