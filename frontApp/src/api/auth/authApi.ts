import { VITE_API_URL } from "@/config";
import { httpClient } from "../client";
import { TGetUserResponse } from "./authApiTypes";

export const authApi = {
   loginWithGoogle: () => {
      window.location.href = `${VITE_API_URL || ""}/auth/google`;
   },
   logout: async () => {
      return await httpClient.post("/auth/logout");
   },
   getUser: async () => {
      return await httpClient.get<TGetUserResponse>("/auth/me");
   },
};
