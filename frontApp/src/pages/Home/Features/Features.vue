<script setup lang="ts">
import FeatureCard from "@components/FeatureCard/FeatureCard.vue";
import { TELEGRAM_BOT_URL } from "@/config";
import { getRafflePath } from "@router/paths";
</script>

<template>
   <section class="features" aria-label="Можливості сервісу">
      <div class="features__container">
         <div class="features__grid">
            <FeatureCard
               icon="trophy"
               title="Щотижневий розіграш"
               description="Кожного тижня обираємо найактивнішого учасника чату. Переможець отримує приємний приз від бару!"
               link-text="Переглянути переможців"
               :link-href="getRafflePath()"
            />
            <FeatureCard
               icon="bot"
               title="Наш бот у Telegram"
               description="Ранковий звіт, новини про події, меню пива та інші корисні повідомлення щодня."
               link-text="Відкрити бота"
               :link-href="TELEGRAM_BOT_URL"
            />
         </div>
      </div>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.features {
   width: 100%;
   background: var(--color-bg);
}

.features__container {
   width: 100%;
   max-width: 1200px;
   margin: 0 auto;
   padding: 0 var(--space-5) var(--space-6);

   @include mq-mobile {
      padding: 0 var(--space-2) var(--space-5);
   }
}

.features__grid {
   display: grid;
   grid-template-columns: repeat(2, minmax(0, 1fr));
   gap: var(--space-5);

   @include mq-mobile {
      grid-template-columns: 1fr;
      gap: var(--space-4);
   }
}
</style>
