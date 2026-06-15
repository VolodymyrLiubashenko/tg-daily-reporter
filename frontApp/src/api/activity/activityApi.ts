import { httpClient } from "../client";
import type { TGetChatUsersResponse } from "./activityApiTypes";

export async function getChatUsers() {
   return await httpClient.get<TGetChatUsersResponse>("/activity/users");
}
