import { getChatUsers } from "@/api/activity/activityApi";
import { getWeeklyWinners } from "@/api/raffle/raffleApi";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";

export const useGetRaffleUsers = () => {
   const {
      data: chatUsersResponse,
      isLoading: isLoadingChatUsers,
      isError: isChatUsersError,
      error: chatUsersError,
   } = useQuery({
      queryKey: ["chatUsers"],
      queryFn: () => getChatUsers(),
      staleTime: 1000 * 60 * 5,
   });

   const {
      data: weeklyWinnersResponse,
      isLoading: isLoadingWeeklyWinners,
      isError: isWeeklyWinnersError,
      error: weeklyWinnersError,
   } = useQuery({
      queryKey: ["weeklyWinners"],
      queryFn: () => getWeeklyWinners(),
      staleTime: 1000 * 60 * 5,
   });

   const chatUsers = computed(() =>
      [...(chatUsersResponse.value?.data.users ?? [])].sort(
         (firstUser, secondUser) =>
            secondUser.messageCountTotal - firstUser.messageCountTotal,
      ),
   );

   const weeklyWinners = computed(() => weeklyWinnersResponse.value?.data.winners ?? []);

   return {
      chatUsers,
      weeklyWinners,
      chatUsersResponse,
      weeklyWinnersResponse,
      isLoadingChatUsers,
      isLoadingWeeklyWinners,
      isChatUsersError,
      isWeeklyWinnersError,
      chatUsersError,
      weeklyWinnersError,
   };
};
