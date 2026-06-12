import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

import "@styles/reset.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";

import App from "@/App.vue";
import { router } from "@/router";
import "@styles/main.css";

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
