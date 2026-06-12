/**
 * Response types
 */

import { IAuthUser } from "@/declarations/user";

export type TGetUserResponse = {
   ok: boolean;
   user: IAuthUser;
};
