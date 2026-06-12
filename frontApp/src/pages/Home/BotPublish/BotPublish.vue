<script setup lang="ts">
import FeatureCard from "@components/FeatureCard/FeatureCard.vue";
import type { TIconName } from "@components/Icon/icons";

type BotPublishItem = {
   icon: TIconName;
   title: string;
   description: string;
};

const items: BotPublishItem[] = [
   {
      icon: "sun",
      title: "Ранковий звіт",
      description: "Щодня о 11:00 короткий звіт про головне.",
   },
   {
      icon: "volleyball",
      title: "Матчі та перегони",
      description: "Анонси матчів Manchester United, Оболонь та гонок F1.",
   },
   {
      icon: "beer",
      title: "Меню розливного",
      description: "Актуальний список пива бару.",
   },
   {
      icon: "gift",
      title: "Розіграші",
      description: "Щотижня обираємо найактивнішого учасника нашого чату.",
   },
];
</script>

<template>
   <section class="bot-publish" aria-labelledby="bot-publish-title">
      <div class="bot-publish__container">
         <h2 id="bot-publish-title" class="bot-publish__title">Що публікує бот</h2>

         <div class="bot-publish__grid">
            <FeatureCard
               v-for="item in items"
               :key="item.title"
               :icon="item.icon"
               :title="item.title"
               :description="item.description"
            />
         </div>
      </div>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.bot-publish {
   width: 100%;
   background: var(--color-surface);
}

.bot-publish__container {
   width: 100%;
   margin: 0 auto;
   padding: var(--space-6) var(--space-5);

   @include mq-mobile {
      padding: var(--space-5) var(--space-2);
   }
}

.bot-publish__title {
   margin: 0 0 var(--space-5);
   font-size: var(--font-size-lg);
   font-weight: 700;
   line-height: 1.25;
   color: var(--color-text-primary);
}

.bot-publish__grid {
   display: grid;
   grid-template-columns: repeat(4, minmax(0, 1fr));
   gap: var(--space-5);

   @include mq-tablet {
      grid-template-columns: repeat(2, minmax(0, 1fr));
   }

   @include mq-mobile {
      grid-template-columns: 1fr;
      gap: var(--space-4);
   }
}
</style>
