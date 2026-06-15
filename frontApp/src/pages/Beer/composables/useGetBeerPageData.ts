import { getFullBeerInfo } from "@/api/beer/beerApi";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";

export const useGetBeerPageData = () => {
   const {
      data: fullBeerInfo,
      isLoading: isLoadingFullBeerInfo,
      isError: isFullBeerInfoError,
      error: fullBeerInfoError,
   } = useQuery({
      queryKey: ["fullBeerInfo"],
      queryFn: () => getFullBeerInfo(),
      staleTime: 1000 * 60 * 5,
   });

   const beers = computed(() => fullBeerInfo.value?.data.beers ?? []);

   return {
      beers,
      fullBeerInfo,
      isLoadingFullBeerInfo,
      isFullBeerInfoError,
      fullBeerInfoError,
   };
};
