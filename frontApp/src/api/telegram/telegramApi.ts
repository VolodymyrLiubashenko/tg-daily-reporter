import { httpClient } from "../client";
import type {
   TEditMessageByAdminRequest,
   TEditMessageByAdminResponse,
   TSendMessageByAdminRequest,
   TSendMessageByAdminResponse,
} from "./telegramApiTypes";

export async function sendMessageByAdmin(payload: TSendMessageByAdminRequest) {
   return await httpClient.post<TSendMessageByAdminResponse>("/telegram/admin/send-message", payload);
}

export async function editMessageByAdmin(payload: TEditMessageByAdminRequest) {
   return await httpClient.post<TEditMessageByAdminResponse>("/telegram/admin/edit-message", payload);
}
