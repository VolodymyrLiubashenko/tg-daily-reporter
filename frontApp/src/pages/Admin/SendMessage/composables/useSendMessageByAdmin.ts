import axios from "axios";
import { computed } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { sendMessageByAdmin } from "@/api/telegram/telegramApi";
import type { TSendMessageByAdminRequest } from "@/api/telegram/telegramApiTypes";

type ApiErrorResponse = {
   message?: string;
};

function getErrorMessage(error: unknown) {
   if (axios.isAxiosError<ApiErrorResponse>(error)) {
      return error.response?.data?.message || error.message;
   }

   return "Не вдалося відправити повідомлення";
}

export const useSendMessageByAdmin = () => {
   const sendMessageMutation = useMutation({
      mutationFn: (payload: TSendMessageByAdminRequest) => sendMessageByAdmin(payload),
   });

   const sendMessageErrorMessage = computed(() => {
      if (!sendMessageMutation.error.value) {
         return "";
      }

      return getErrorMessage(sendMessageMutation.error.value);
   });

   return {
      sendMessageByAdmin: sendMessageMutation.mutateAsync,
      resetSendMessageByAdmin: sendMessageMutation.reset,
      isSendingMessageByAdmin: sendMessageMutation.isPending,
      isSendMessageByAdminError: sendMessageMutation.isError,
      sendMessageByAdminError: sendMessageMutation.error,
      sendMessageErrorMessage,
   };
};
