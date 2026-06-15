<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
</script>

<template>
   <section class="beer-banner">
      <div class="beer-banner__content">
         <span class="beer-banner__eyebrow">
            <Icon name="beer" :size="16" />
            Пивна карта
         </span>
         <h1 class="beer-banner__title">Пиво на кранах</h1>
         <p class="beer-banner__text">
            Добірка крафтового пива, яку ми регулярно оновлюємо. Від класики до експериментів — для
            справжніх поціновувачів та нашої спільноти.
         </p>
      </div>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.beer-banner {
   position: relative;
   margin: var(--space-4);
   padding: var(--space-6);
   border-radius: var(--radius-md);
   background: url("/images/beer-banner.png") right center / cover no-repeat;
   overflow: hidden;

   @include mq-mobile {
      margin: var(--space-3);
      padding: var(--space-5) var(--space-4);
      background: url("/images/beer-banner.png") 68% center / cover no-repeat;
   }
}

.beer-banner__content {
   position: relative;
   z-index: 1;
   max-width: 456px;
}

.beer-banner__eyebrow {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   margin-bottom: var(--space-2);
   color: var(--color-primary);
   font-size: var(--font-size-sm);
   font-weight: 700;
   line-height: 1;
   text-transform: uppercase;
}

.beer-banner__title {
   margin: 0 0 var(--space-4);
   font-size: var(--font-size-2xl);
   font-weight: 800;
   color: var(--color-text-white);

   @include mq-mobile {
      font-size: var(--font-size-xl);
   }
}

.beer-banner__text {
   margin: 0;
   max-width: 500px;
   font-size: var(--font-size-md);
   line-height: 1.55;
   color: var(--color-text-white);
}
</style>
