export interface IBeerPrice {
   volume: string;
   price: string;
}

export interface IFullBeerInfo {
   tapNumber: number;
   name: string;
   untappdUrl: string | null;
   brewery: string;
   abv: string;
   ibu: string;
   style: string;
   imageUrl: string;
   prices: IBeerPrice[];
}
