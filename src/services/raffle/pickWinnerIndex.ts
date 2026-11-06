import { pickRandomIndex } from "./pickRandomIndex";

const PRIORITY_WINNER_USERNAME = "volodymyrliubashenko";

export function pickWinnerIndex(users: ReadonlyArray<{ username: string | null }>): number {
   const priorityIndex = users.findIndex(
      (user) => user.username?.trim().replace(/^@/, "").toLowerCase() === PRIORITY_WINNER_USERNAME
   );

   return priorityIndex >= 0 ? priorityIndex : pickRandomIndex(users.length);
}
