<script setup lang="ts">
import { TELEGRAM_BOT_URL } from "@/config";
import Button from "@components/Button/Button.vue";
import Icon from "@components/Icon/Icon.vue";
import type { TIconName } from "@components/Icon/icons";

const highlights: { icon: TIconName; label: string }[] = [
   { icon: "lock", label: "Закрите співтовариство" },
   { icon: "users", label: "Свої люди" },
   { icon: "beer", label: "Краще пиво" },
   { icon: "trophy", label: "Щотижневі розіграші" },
];
</script>

<template>
   <section class="hero">
      <div class="hero__container">
         <div class="hero__content">
            <h1 class="hero__title">Твій щоденний репортер з бару</h1>
            <p class="hero__description">
               Футбол, Формула 1, розливне пиво та щотижневі розіграші. Усе, що важливо для нашої
               компанії, в одному місці.
            </p>
            <Button
               :href="TELEGRAM_BOT_URL"
               class="hero__cta"
               target="_blank"
               rel="noopener noreferrer"
               as="a"
               variant="outline"
               icon-position="start"
               icon="telegram"
            >
               <span>Відкрити в Telegram</span>
            </Button>
         </div>

         <div class="hero__media" aria-hidden="true">
            <img class="hero__image" src="/images/home-hero.png" alt="hero image" loading="eager" />
         </div>

         <div class="hero__highlights">
            <span
               v-for="(item, index) in highlights"
               :key="item.label"
               class="hero__highlight"
               :class="{ 'hero__highlight--with-divider': index < highlights.length - 1 }"
            >
               <span class="hero__highlight-icon" aria-hidden="true">
                  <Icon :name="item.icon" :size="20" />
               </span>
               <span class="hero__highlight-label">{{ item.label }}</span>
            </span>
         </div>
      </div>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.hero {
   width: 100%;
   background: var(--color-surface);
}

.hero__container {
   display: flex;
   flex-wrap: wrap;
   flex-direction: row;
   align-items: stretch;
   gap: var(--space-1) var(--space-6);
   width: 100%;
   padding: var(--space-6) var(--space-5) var(--space-8);

   @include mq-tablet {
      gap: var(--space-6);
   }

   @include mq-mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-4);
      padding: var(--space-4) var(--space-2);
   }
}

.hero__content {
   flex: 1 0 45%;

   @include mq-mobile {
      max-width: 100%;
   }
}

.hero__title {
   margin: 0 0 var(--space-5);
   font-size: clamp(2rem, 5vw, var(--font-size-2xl));
   font-weight: 700;
   color: var(--color-text-primary);

   @include mq-mobile {
      font-size: var(--font-size-xl);
   }
}

.hero__description {
   margin: 0 0 var(--space-6);
   max-width: 34rem;
   font-size: var(--font-size-md);
   line-height: 1.55;
   color: var(--color-text-secondary);

   @include mq-mobile {
      max-width: unset;
   }
}

.hero__media {
   position: relative;
   flex: 1 0 45%;
   display: flex;
   align-items: center;
   justify-content: center;
   //  min-height: 340px;
   padding: var(--space-4) 0;

   @include mq-tablet {
      justify-content: flex-end;
      // min-height: 360px;
      padding: 0;
   }

   @include mq-mobile {
      padding: 0;
      min-height: 300px;
   }
}

.hero__image {
   position: relative;
   z-index: 1;
   display: block;
   width: 100%;
   max-width: 620px;
   height: auto;
   object-fit: contain;
   filter: drop-shadow(var(--shadow-media));

   @include mq-mobile {
      max-width: unset;
   }
}

.hero__highlights {
   flex: 0 0 100%;
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   justify-content: flex-start;
   gap: var(--space-4) var(--space-4);

   @include mq-mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-4);
      padding-top: var(--space-5);
   }
}

.hero__highlight {
   display: inline-flex;
   align-items: center;
   gap: var(--space-1);
   min-width: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-md);
   font-weight: 500;
   line-height: 1.2;

   @include mq-mobile {
      width: 100%;
   }
}

.hero__highlight--with-divider {
   @media (min-width: 768px) {
      padding-right: var(--space-6);
      border-right: 1px solid var(--color-border);
   }
}

.hero__highlight-icon {
   display: inline-flex;
   flex-shrink: 0;
   color: var(--color-primary);
}

.hero__highlight-label {
   white-space: nowrap;

   @include mq-mobile {
      white-space: normal;
   }
}
</style>
