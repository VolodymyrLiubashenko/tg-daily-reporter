<script setup lang="ts">
import Button from "@components/Button/Button.vue";
import Icon from "@components/Icon/Icon.vue";
import RaffleStats from "../Stats/RaffleStats.vue";
</script>

<template>
   <section class="raffle-banner">
      <div class="raffle-banner__hero">
         <div class="raffle-banner__content">
            <span class="raffle-banner__eyebrow">
               <Icon name="gift" :size="16" />
               Щотижневий розіграш
            </span>

            <h1 class="raffle-banner__title">Тижневий розіграш</h1>

            <p class="raffle-banner__text">
               Кожного тижня ми обираємо одного активного учасника та даруємо крутий приз!
            </p>

            <div class="raffle-banner__actions">
               <Button icon="gift" icon-position="start" :icon-size="16">Як це працює?</Button>

               <span class="raffle-banner__schedule">
                  <Icon name="calendar" :size="16" />
                  Розіграш щоп'ятниці о 18:00
               </span>
            </div>
         </div>

         <div class="raffle-banner__image-wrap" aria-hidden="true">
            <img class="raffle-banner__image" src="/images/gift.png" alt="" />
         </div>
      </div>

      <RaffleStats />
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.raffle-banner {
   display: flex;
   flex-direction: column;
   gap: var(--space-4);
   margin: var(--space-4);

   @include mq-mobile {
      gap: var(--space-3);
      margin: var(--space-3);
   }
}

.raffle-banner__hero {
   position: relative;
   display: grid;
   grid-template-columns: minmax(0, 1fr) minmax(280px, 520px);
   align-items: center;
   min-height: 284px;
   padding: var(--space-6);
   background: var(--color-surface);
   border: 1px solid var(--color-border);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-sm);
   overflow: hidden;

   @include mq-tablet {
      grid-template-columns: minmax(0, 1fr) 360px;
   }

   @include mq-mobile {
      grid-template-columns: 1fr;
      min-height: 0;
      padding: var(--space-5) var(--space-4) 0;
   }
}

.raffle-banner__content {
   position: relative;
   z-index: 1;
   max-width: 560px;
}

.raffle-banner__eyebrow {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   margin-bottom: var(--space-4);
   color: var(--color-primary);
   font-size: var(--font-size-sm);
   font-weight: 700;
   line-height: 1;
}

.raffle-banner__title {
   margin: 0 0 var(--space-4);
   color: var(--color-text-primary);
   font-size: 44px;
   font-weight: 800;
   line-height: 1.05;

   @include mq-mobile {
      font-size: var(--font-size-xl);
   }
}

.raffle-banner__text {
   max-width: 420px;
   margin: 0;
   color: var(--color-text-secondary);
   font-size: var(--font-size-md);
   line-height: 1.45;
}

.raffle-banner__actions {
   display: flex;
   align-items: center;
   gap: var(--space-5);
   margin-top: var(--space-5);

   @include mq-mobile {
      align-items: flex-start;
      flex-direction: column;
      gap: var(--space-3);
      margin-top: var(--space-4);
   }
}

.raffle-banner__schedule {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   color: var(--color-text-secondary);
   font-size: var(--font-size-sm);
   font-weight: 500;
   line-height: 1.2;
}

.raffle-banner__schedule :deep(svg) {
   color: var(--color-text-muted);
}

.raffle-banner__image-wrap {
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   min-width: 0;
   height: 236px;

   @include mq-mobile {
      height: 180px;
      margin-top: var(--space-3);
   }
}

.raffle-banner__image {
   display: block;
   width: min(100%, 520px);
   height: 100%;
   object-fit: contain;
}
</style>
