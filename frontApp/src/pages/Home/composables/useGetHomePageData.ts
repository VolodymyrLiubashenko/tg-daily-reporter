import { sportApi } from "@/api/sport/sportApi";
import { useQuery } from "@tanstack/vue-query";

export const useGetHomePageData = () => {
   const { data: nextManchesterUnitedMatch, isLoading: isLoadingNextManchesterUnitedMatch } =
      useQuery({
         queryKey: ["nextManchesterUnitedMatch"],
         queryFn: () => sportApi.getNextManchesterUnitedMatch(),
         staleTime: 1000 * 60 * 5,
      });

   const { data: nextObolonMatch, isLoading: isLoadingNextObolonMatch } = useQuery({
      queryKey: ["nextObolonMatch"],
      queryFn: () => sportApi.getObolonNextMatch(),
      staleTime: 1000 * 60 * 5,
   });

   const { data: nextF1Race, isLoading: isLoadingNextF1Race } = useQuery({
      queryKey: ["nextF1Race"],
      queryFn: () => sportApi.getF1NextRace(),
      staleTime: 1000 * 60 * 5,
   });

   return {
      nextManchesterUnitedMatch,
      nextObolonMatch,
      nextF1Race,
      isLoadingNextManchesterUnitedMatch,
      isLoadingNextObolonMatch,
      isLoadingNextF1Race,
   };
};
