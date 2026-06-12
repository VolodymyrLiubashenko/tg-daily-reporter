<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import MuMatchCard from "@/modules/sport/MuMatchCard/MuMatchCard.vue";
import ObolonMatchCard from "@/modules/sport/ObolonMatchCard/ObolonMatchCard.vue";
import F1RaceCard from "@/modules/sport/F1RaceCard/F1RaceCard.vue";
import { useGetHomePageData } from "../composables/useGetHomePageData";
import { computed } from "vue";

const { nextManchesterUnitedMatch, nextObolonMatch, nextF1Race } = useGetHomePageData();

const muMatch = computed(() => nextManchesterUnitedMatch.value?.data?.match ?? null);
const obolonMatch = computed(() => nextObolonMatch.value?.data?.match ?? null);
const f1Race = computed(() => nextF1Race.value?.data?.race ?? null);
</script>

<template>
   <section class="next-events" aria-labelledby="next-events-title">
      <div class="next-events__container">
         <header class="next-events__header">
            <div class="next-events__heading">
               <span class="next-events__icon" aria-hidden="true">
                  <Icon name="calendar" :size="22" />
               </span>
               <div class="next-events__titles">
                  <h2 id="next-events-title" class="next-events__title">Наступні події</h2>
                  <p class="next-events__subtitle">Актуальні матчі та перегони</p>
               </div>
            </div>
         </header>

         <div class="next-events__grid">
            <MuMatchCard :match="muMatch" />
            <ObolonMatchCard :match="obolonMatch" />
            <F1RaceCard :race="f1Race" />
         </div>
      </div>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.next-events {
   width: 100%;
   background: var(--color-bg);
}

.next-events__container {
   width: 100%;
   margin: 0 auto;
   padding: var(--space-6) var(--space-5);

   @include mq-mobile {
      padding: var(--space-5) var(--space-2);
   }
}

.next-events__header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: var(--space-4);
   margin-bottom: var(--space-5);

   @include mq-mobile {
      flex-direction: column;
      align-items: stretch;
      gap: var(--space-4);
   }
}

.next-events__heading {
   display: flex;
   align-items: center;
   gap: var(--space-4);
   min-width: 0;
}

.next-events__icon {
   display: inline-flex;
   flex-shrink: 0;
   align-items: center;
   justify-content: center;
   width: 44px;
   height: 44px;
   color: var(--color-primary);
   background: var(--color-primary-light);
   border-radius: var(--radius-md);
}

.next-events__titles {
   min-width: 0;
}

.next-events__title {
   margin: 0 0 var(--space-1);
   font-size: var(--font-size-lg);
   font-weight: 700;
   line-height: 1.25;
   color: var(--color-text-primary);
}

.next-events__subtitle {
   margin: 0;
   font-size: var(--font-size-sm);
   line-height: 1.45;
   color: var(--color-text-secondary);
}

.next-events__all-btn {
   flex-shrink: 0;

   @include mq-mobile {
      width: 100%;
   }
}

.next-events__grid {
   display: grid;
   grid-template-columns: repeat(3, minmax(0, 1fr));
   gap: var(--space-5);

   @include mq-tablet {
      grid-template-columns: repeat(2, minmax(0, 1fr));
   }
   @include mq-mobile {
      grid-template-columns: 1fr;
   }
}
</style>
