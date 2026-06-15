import axios from "axios";
import * as cheerio from "cheerio";

const BAR_MENU_URL = "https://barandbeer.pp.ua/Menu/My%20TV%20Menu/59";
const BAR_BASE_URL = "https://barandbeer.pp.ua";

export type TBeerPrice = {
   volume: string;
   price: string;
};

export type TFullBeerInfo = {
   tapNumber: number;
   name: string;
   untappdUrl: string | null;
   brewery: string;
   abv: string;
   ibu: string;
   style: string;
   imageUrl: string;
   prices: TBeerPrice[];
};

function resolveImageUrl(src: string): string {
   if (!src) {
      return "";
   }

   if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
   }

   return src.startsWith("/") ? `${BAR_BASE_URL}${src}` : `${BAR_BASE_URL}/${src}`;
}

function textAfterLabel(raw: string): string {
   const colonIndex = raw.indexOf(":");

   if (colonIndex >= 0) {
      return raw.slice(colonIndex + 1).trim();
   }

   return raw.trim();
}

function parseTapNumber(raw: string): number {
   const digits = raw.replace(/\D/g, "");

   return digits ? Number.parseInt(digits, 10) : 0;
}

export async function getFullBeerInfo(): Promise<TFullBeerInfo[]> {
   const response = await axios.get<string>(BAR_MENU_URL, {
      timeout: 15000,
      headers: {
         "User-Agent": "Mozilla/5.0",
      },
   });

   const $ = cheerio.load(response.data);
   const beers: TFullBeerInfo[] = [];

   $(".product-card").each((_, card) => {
      const $card = $(card);

      const nameLink = $card.find(".product-card-beer-name a").first();
      const name = nameLink.text().trim();

      if (!name) {
         return;
      }

      const prices: TBeerPrice[] = [];

      $card.find(".product-card-pair").each((__, pair) => {
         const $pair = $(pair);
         const volume = $pair.find(".product-card-volume").text().trim();
         const price = $pair.find(".product-card-price").text().trim();

         if (volume || price) {
            prices.push({ volume, price });
         }
      });

      beers.push({
         tapNumber: parseTapNumber($card.find(".product-card-tap-number").text()),
         name,
         untappdUrl: nameLink.attr("href")?.trim() ?? null,
         brewery: $card.find(".product-card-brewery-name").text().trim(),
         abv: textAfterLabel($card.find(".product-card-beer-abv").text()),
         ibu: textAfterLabel($card.find(".product-card-beer-ibu").text()),
         style: $card.find(".product-card-beer-style").text().trim(),
         imageUrl: resolveImageUrl($card.find(".product-card-image").attr("src")?.trim() ?? ""),
         prices,
      });
   });

   if (!beers.length) {
      throw new Error("Failed to parse full beer info from menu page");
   }

   return beers;
}
