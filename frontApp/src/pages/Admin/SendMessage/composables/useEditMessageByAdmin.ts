import axios from "axios";
import { computed } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { editMessageByAdmin } from "@/api/telegram/telegramApi";
import type { TEditMessageByAdminRequest } from "@/api/telegram/telegramApiTypes";

type ApiErrorResponse = {
   message?: string;
};

function getErrorMessage(error: unknown) {
   if (axios.isAxiosError<ApiErrorResponse>(error)) {
      return error.response?.data?.message || error.message;
   }

   return "Не вдалося відредагувати повідомлення";
}

export const useEditMessageByAdmin = () => {
   const editMessageMutation = useMutation({
      mutationFn: (payload: TEditMessageByAdminRequest) => editMessageByAdmin(payload),
   });

   const editMessageErrorMessage = computed(() => {
      if (!editMessageMutation.error.value) {
         return "";
      }

      return getErrorMessage(editMessageMutation.error.value);
   });

   return {
      editMessageByAdmin: editMessageMutation.mutateAsync,
      resetEditMessageByAdmin: editMessageMutation.reset,
      isEditingMessageByAdmin: editMessageMutation.isPending,
      isEditMessageByAdminError: editMessageMutation.isError,
      editMessageByAdminError: editMessageMutation.error,
      editMessageErrorMessage,
   };
};
