<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import BeerCard from "@/modules/beer/BeerCard/BeerCard.vue";
import { useGetBeerPageData } from "../composables/useGetBeerPageData";

const { beers, isLoadingFullBeerInfo, isFullBeerInfoError } = useGetBeerPageData();
</script>

<template>
   <section class="beers-grid">
      <template v-if="isLoadingFullBeerInfo">
         <div v-for="index in 4" :key="index" class="beers-grid__placeholder" />
      </template>

      <template v-else-if="isFullBeerInfoError">
         <div class="beers-grid__state">
            <Icon name="info" :size="32" />
            <h2 class="beers-grid__state-title">Пивна карта недоступна</h2>
            <p class="beers-grid__state-text">Спробуйте оновити сторінку трохи пізніше.</p>
         </div>
      </template>

      <template v-else-if="beers.length">
         <BeerCard v-for="beer in beers" :key="beer.tapNumber" :beer="beer" />
      </template>

      <template v-else>
         <div class="beers-grid__state">
            <Icon name="beer" :size="40" />
            <h2 class="beers-grid__state-title">Пивна карта оновлюється</h2>
            <p class="beers-grid__state-text">Скоро тут зʼявляться позиції на кранах.</p>
         </div>
      </template>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.beers-grid {
   display: grid;
   grid-template-columns: repeat(3, minmax(0, 1fr));
   gap: var(--space-4);
   width: 100%;
   padding: 0 var(--space-4) var(--space-7);

   @include mq-laptop {
      grid-template-columns: repeat(2, minmax(0, 1fr));
   }

   @include mq-tablet {
      grid-template-columns: repeat(2, minmax(0, 1fr));
   }

   @include mq-mobile {
      grid-template-columns: 1fr;
      gap: var(--space-3);
      padding: 0 var(--space-3) var(--space-6);
   }
}

.beers-grid__placeholder,
.beers-grid__state {
   min-height: 236px;
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-md);
}

.beers-grid__placeholder {
   background: var(--color-surface-secondary);
}

.beers-grid__state {
   grid-column: span 2;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   gap: var(--space-3);
   padding: var(--space-6);
   color: var(--color-primary-hover);
   text-align: center;

   @include mq-mobile {
      grid-column: auto;
   }
}

.beers-grid__state-title {
   margin: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-lg);
   font-weight: 700;
   line-height: 1.2;
}

.beers-grid__state-text {
   margin: 0;
   color: var(--color-text-secondary);
   font-size: var(--font-size-sm);
   line-height: 1.4;
}
</style>
