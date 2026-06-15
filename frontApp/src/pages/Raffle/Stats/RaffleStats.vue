<script setup lang="ts">
import FeatureCard from "@components/FeatureCard/FeatureCard.vue";
import type { TIconName } from "@components/Icon/icons";

type RaffleStat = {
   icon: TIconName;
   label: string;
   value: string;
};

const raffleStats: RaffleStat[] = [
   {
      icon: "users",
      label: "Учасників",
      value: "1 248",
   },
   {
      icon: "telegram",
      label: "Усього повідомлень",
      value: "24 587",
   },
   {
      icon: "user",
      label: "Найактивніший учасник",
      value: "@serhii_ty",
   },
   {
      icon: "gift",
      label: "Приз цього тижня",
      value: "Сертифікат",
   },
];
</script>

<template>
   <div class="raffle-banner__stats" aria-label="Статистика розіграшу">
      <FeatureCard
         v-for="stat in raffleStats"
         :key="stat.label"
         class="raffle-banner__stat-card"
         :icon="stat.icon"
         :title="stat.value"
         :description="stat.label"
      />
   </div>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.raffle-banner__stats {
   display: grid;
   grid-template-columns: repeat(4, minmax(0, 1fr));
   gap: var(--space-4);

   @include mq-tablet {
      grid-template-columns: repeat(2, minmax(0, 1fr));
   }

   @include mq-mobile {
      grid-template-columns: 1fr;
      gap: var(--space-3);
   }
}

.raffle-banner__stat-card {
   min-height: 108px;
   align-items: center;
   padding: var(--space-4);
   border-color: var(--color-border);
   border-radius: var(--radius-md);

   @include mq-mobile {
      flex-direction: row;
      min-height: 64px;
      padding: var(--space-3);
   }
}
</style>
