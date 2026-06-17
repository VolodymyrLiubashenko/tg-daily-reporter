import { createRouter, createWebHistory } from "vue-router";

import Home from "@pages/Home/Home.vue";
import About from "@pages/About/About.vue";
import Raffle from "@pages/Raffle/Raffle.vue";
import Beer from "@pages/Beer/Beer.vue";
import Admin from "@pages/Admin/Admin.vue";
import { ADMIN_EMAILS } from "@/config";
import { authApi } from "@/api/auth/authApi";
import {
   getAboutPath,
   getAdminPath,
   getBeerPath,
   getHomePath,
   getRafflePath,
} from "@router/paths";

export const router = createRouter({
   history: createWebHistory(),
   routes: [
      {
         path: getHomePath(),
         name: "Головна",
         component: Home,
      },
      {
         path: getAboutPath(),
         name: "Про бота",
         component: About,
      },
      {
         path: getBeerPath(),
         name: "Пиво",
         component: Beer,
      },
      {
         path: getRafflePath(),
         name: "Розіграш",
         component: Raffle,
      },
      {
         path: getAdminPath(),
         name: "Адмін-панель",
         component: Admin,
         meta: {
            requiresAdmin: true,
         },
      },
   ],
});

router.beforeEach(async (to) => {
   if (!to.meta.requiresAdmin) {
      return true;
   }

   try {
      const response = await authApi.getUser();
      const userEmail = response.data.user?.email?.toLowerCase();

      if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
         return true;
      }
   } catch {
      return getHomePath();
   }

   return getHomePath();
});
