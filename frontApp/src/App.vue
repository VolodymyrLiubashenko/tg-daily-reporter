<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

const route = useRoute();

const layouts = {
   default: DefaultLayout,
   empty: EmptyLayout,
};

const layout = computed(() => {
   const routeLayout = route.meta.layout;

   if (routeLayout === "empty") {
      return layouts.empty;
   }

   return layouts.default;
});
</script>

<template>
   <div class="app">
      <component :is="layout">
         <RouterView />
      </component>
   </div>
</template>

<style scoped lang="scss">
.app {
   display: flex;
   flex-direction: column;
   min-height: 100vh;
}
</style>
