<script setup lang="ts">
import StepCard from "@components/StepCard/StepCard.vue";
import type { TIconName } from "@components/Icon/icons";

type RaffleStep = {
   step: number;
   icon: TIconName;
   title: string;
   text: string;
};

const raffleSteps: RaffleStep[] = [
   {
      step: 1,
      icon: "telegram",
      title: "Пиши щодня",
      text: "Пиши повідомлення в канали, які ми відстежуємо.",
   },
   {
      step: 2,
      icon: "activity",
      title: "Заробляй бали",
      text: "Кожне повідомлення додає бали до твого рейтингу.",
   },
   {
      step: 3,
      icon: "trophy",
      title: "Потрапляй у розіграш",
      text: "Чим більше балів, тим вищі шанси на перемогу!",
   },
   {
      step: 4,
      icon: "gift",
      title: "Вигравай призи",
      text: "Щоп'ятниці ми обираємо одного переможця випадково.",
   },
];
</script>

<template>
   <section class="raffle-how">
      <h2 class="raffle-how__title">Як це працює?</h2>

      <div class="raffle-how__grid">
         <StepCard
            v-for="item in raffleSteps"
            :key="item.step"
            :step="item.step"
            :icon="item.icon"
            :title="item.title"
            :text="item.text"
         />
      </div>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.raffle-how {
   display: flex;
   flex-direction: column;
   gap: var(--space-4);
   margin: 0 var(--space-4) var(--space-6);

   @include mq-mobile {
      gap: var(--space-3);
      margin: 0 var(--space-3) var(--space-5);
   }
}

.raffle-how__title {
   margin: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-lg);
   font-weight: 800;
   line-height: 1.2;
   text-align: center;
}

.raffle-how__grid {
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
</style>
