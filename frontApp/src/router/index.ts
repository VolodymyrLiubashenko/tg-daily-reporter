import { createRouter, createWebHistory } from "vue-router";

import Home from "@pages/Home/Home.vue";
import About from "@pages/About/About.vue";
import Raffle from "@pages/Raffle/Raffle.vue";
import Beer from "@pages/Beer/Beer.vue";
import { getAboutPath, getBeerPath, getHomePath, getRafflePath } from "@router/paths";

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
   ],
});
