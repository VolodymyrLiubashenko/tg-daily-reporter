import axios from "axios";
import * as cheerio from "cheerio";

export type TTapBeer = {
   name: string;
};

const BAR_MENU_URL = "https://barandbeer.pp.ua/Menu/My%20TV%20Menu/59";

export async function getTapBeerList(): Promise<TTapBeer[]> {
   const response = await axios.get<string>(BAR_MENU_URL, {
      timeout: 15000,
      headers: {
         "User-Agent": "Mozilla/5.0",
      },
   });

   const $ = cheerio.load(response.data);

   const names = new Set<string>();

   $(".product-card-beer-name a").each((_, element) => {
      const name = $(element).text().trim();

      if (name) {
         names.add(name);
      }
   });

   const beers = Array.from(names).map((name) => ({ name }));

   if (!beers.length) {
      throw new Error("Failed to parse beer list from menu page");
   }

   return beers;
}
