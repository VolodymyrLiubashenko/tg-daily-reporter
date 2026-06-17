import { authApi } from "@/api/auth/authApi";
import type { IAuthUser } from "@/declarations/user";
import { getHomePath } from "@/router/paths";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, Ref, type ComputedRef } from "vue";
import { useRouter } from "vue-router";

interface IUseAuth {
   user: ComputedRef<IAuthUser | null>;
   isAuthenticated: ComputedRef<boolean>;
   isLoading: Ref<boolean>;
   loginWithGoogle: () => void;
   logout: () => void;
}

export const useAuth = (): IUseAuth => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const userQuery = useQuery({
      queryKey: ["user", "me", "auth"],
      queryFn: () => authApi.getUser(),
      staleTime: 1000 * 60 * 5,
   });

   const { mutate: logout } = useMutation({
      mutationFn: () => authApi.logout(),
      onSuccess: () => {
         queryClient.setQueryData(["user", "me", "auth"], {
            data: {
               ok: true,
               user: null,
            },
         });
         queryClient.invalidateQueries({ queryKey: ["user", "me", "auth"] });
         router.push(getHomePath());
      },
   });

   const loginWithGoogle = () => {
      authApi.loginWithGoogle();
   };

   const user = computed(() => userQuery.data.value?.data?.user ?? null);

   const isAuthenticated = computed(() => !!user.value);

   return { user, isAuthenticated, isLoading: userQuery.isLoading, loginWithGoogle, logout };
};
