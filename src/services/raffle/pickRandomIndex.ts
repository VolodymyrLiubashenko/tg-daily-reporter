import { randomInt } from "crypto";

export function pickRandomIndex(length: number) {
   if (!Number.isInteger(length) || length <= 0) {
      throw new Error("Cannot pick random index from empty list");
   }

   return randomInt(length);
}
