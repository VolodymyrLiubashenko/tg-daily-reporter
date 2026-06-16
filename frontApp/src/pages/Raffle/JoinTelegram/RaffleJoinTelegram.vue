<script setup lang="ts">
import Button from "@components/Button/Button.vue";
import Icon from "@components/Icon/Icon.vue";
import { TELEGRAM_BOT_URL } from "@/config";
</script>

<template>
   <section class="raffle-join">
      <div class="raffle-join__icon" aria-hidden="true">
         <Icon name="gift" :size="24" />
      </div>

      <div class="raffle-join__content">
         <h2 class="raffle-join__title">Будь активним — вигравай щотижня!</h2>
         <p class="raffle-join__text">
            Пиши більше якісних повідомлень і піднімайся в рейтингу. Удача може посміхнутися саме тобі!
         </p>
      </div>

      <Button
         as="a"
         class="raffle-join__button"
         :href="TELEGRAM_BOT_URL"
         target="_blank"
         rel="noopener noreferrer"
      >
         Почати зараз
      </Button>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.raffle-join {
   display: grid;
   grid-template-columns: auto minmax(0, 1fr) auto;
   align-items: center;
   gap: var(--space-4);
   margin: 0 var(--space-4) var(--space-6);
   padding: var(--space-4);
   background: linear-gradient(90deg, var(--color-success-bg), var(--color-surface));
   border: 1px solid var(--color-primary-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-sm);

   @include mq-mobile {
      grid-template-columns: auto minmax(0, 1fr);
      gap: var(--space-3);
      margin: 0 var(--space-3) var(--space-5);
      padding: var(--space-3);
   }
}

.raffle-join__icon {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 56px;
   height: 56px;
   color: var(--color-primary);
   background: var(--color-primary-light);
   border-radius: 50%;

   @include mq-mobile {
      width: 48px;
      height: 48px;
   }
}

.raffle-join__content {
   min-width: 0;
}

.raffle-join__title {
   margin: 0 0 var(--space-1);
   color: var(--color-text-primary);
   font-size: var(--font-size-md);
   font-weight: 800;
   line-height: 1.2;
}

.raffle-join__text {
   margin: 0;
   color: var(--color-text-secondary);
   font-size: var(--font-size-sm);
   line-height: 1.35;
}

.raffle-join__button {
   min-width: 148px;

   @include mq-mobile {
      grid-column: 1 / -1;
      width: 100%;
   }
}
</style>
