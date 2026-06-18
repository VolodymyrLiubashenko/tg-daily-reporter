<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import type { IF1NextRace } from "@/declarations/sport";
import { formatKyivRaceDate } from "@/utils/date/day";
import { computed } from "vue";

type Props = {
   race: IF1NextRace | null;
};

const props = defineProps<Props>();

const BANNER_SRC = "/images/f1-race-banner.png";
const CATEGORY_NAME = "Формула 1";

const raceDetails = computed(() => {
   if (!props.race) {
      return null;
   }

   return {
      title: props.race.raceName,
      date: formatKyivRaceDate(props.race.date),
      circuit: props.race.circuitName,
      location: `${props.race.locality} · ${props.race.country}`,
   };
});

const detailRows = computed(() => {
   if (!raceDetails.value) {
      return [];
   }

   return [
      { icon: "calendar" as const, label: "Дата", value: raceDetails.value.date },
      { icon: "activity" as const, label: "Траса", value: raceDetails.value.circuit },
      { icon: "mapPin" as const, label: "Локація", value: raceDetails.value.location },
   ];
});
</script>

<template>
   <article class="f1-race-card">
      <header class="f1-race-card__banner">
         <img
            class="f1-race-card__banner-image"
            :src="BANNER_SRC"
            alt="f1 race banner"
            loading="lazy"
         />
      </header>

      <div class="f1-race-card__body">
         <template v-if="race && raceDetails">
            <div class="f1-race-card__headline">
               <h3 class="f1-race-card__title">{{ raceDetails.title }}</h3>
               <span class="f1-race-card__status">
                  <Icon name="calendar" :size="14" />
                  <span>Заплановано</span>
               </span>
            </div>

            <dl class="f1-race-card__details">
               <div v-for="row in detailRows" :key="row.label" class="f1-race-card__detail-row">
                  <dt class="f1-race-card__detail-label">
                     <Icon :name="row.icon" :size="18" class="f1-race-card__detail-icon" />
                     <span>{{ row.label }}</span>
                  </dt>
                  <dd class="f1-race-card__detail-value">{{ row.value }}</dd>
               </div>
            </dl>

            <p class="f1-race-card__notice f1-race-card__notice--success">
               <Icon name="circleCheck" :size="18" class="f1-race-card__notice-icon" />
               <span>Наступна гонка підтверджено</span>
            </p>
         </template>

         <template v-else>
            <h3 class="f1-race-card__title">{{ CATEGORY_NAME }}</h3>

            <p class="f1-race-card__empty-status">
               <Icon name="calendar" :size="18" class="f1-race-card__empty-status-icon" />
               <span>Даних про наступну гонку немає</span>
            </p>

            <p class="f1-race-card__notice f1-race-card__notice--info">
               <Icon name="info" :size="18" class="f1-race-card__notice-icon" />
               <span>
                  Міжсезоння. Інформація про наступну гонку з'явиться ближче до початку сезону.
               </span>
            </p>
         </template>
      </div>
   </article>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.f1-race-card {
   overflow: hidden;
   width: 100%;
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-lg);
   box-shadow: var(--shadow-md);
   max-width: none;
   height: 100%;
}

.f1-race-card__banner {
   position: relative;
   aspect-ratio: 16 / 9;
   overflow: hidden;
   background: var(--color-surface-inverse);
}

.f1-race-card__banner-image {
   display: block;
   width: 100%;
   height: 100%;
   object-fit: cover;
   object-position: center;
}

.f1-race-card__body {
   display: flex;
   flex-direction: column;
   gap: var(--space-4);
   padding: var(--space-5);

   @include mq-mobile {
      gap: var(--space-3);
      padding: var(--space-2);
   }
}

.f1-race-card__headline {
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
   gap: var(--space-3);

   @include mq-mobile {
      flex-direction: column-reverse;
      align-items: flex-start;
      gap: var(--space-2);
   }
}

.f1-race-card__title {
   margin: 0;
   font-size: var(--font-size-lg);
   font-weight: 700;
   line-height: 1.25;
   color: var(--color-text-primary);
}

.f1-race-card__status {
   display: inline-flex;
   flex-shrink: 0;
   align-items: center;
   gap: var(--space-1);
   padding: var(--space-1) var(--space-3);
   font-size: var(--font-size-xs);
   font-weight: 600;
   color: var(--color-primary-hover);
   background: var(--color-success-bg);
   border-radius: 999px;

   @include mq-mobile {
      margin-left: auto;
   }
}

.f1-race-card__details {
   display: flex;
   flex-direction: column;
   gap: 0;
   margin: 0;
}

.f1-race-card__detail-row {
   display: grid;
   grid-template-columns: minmax(88px, 34%) 1fr;
   gap: var(--space-3);
   align-items: center;
   padding: var(--space-3) 0;
   border-bottom: 1px solid var(--color-border-light);

   &:last-child {
      border-bottom: none;
      padding-bottom: 0;
   }
}

.f1-race-card__detail-label {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   margin: 0;
   font-size: var(--font-size-sm);
   font-weight: 500;
   color: var(--color-text-secondary);
}

.f1-race-card__detail-icon {
   color: var(--color-primary);
}

.f1-race-card__detail-value {
   margin: 0;
   font-size: var(--font-size-sm);
   font-weight: 600;
   line-height: 1.45;
   color: var(--color-text-primary);
}

.f1-race-card__empty-status {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   margin: 0;
   font-size: var(--font-size-sm);
   font-weight: 500;
   color: var(--color-text-secondary);
}

.f1-race-card__empty-status-icon {
   color: var(--color-text-muted);
}

.f1-race-card__notice {
   display: flex;
   align-items: flex-start;
   gap: var(--space-3);
   margin: 0;
   padding: var(--space-4);
   font-size: var(--font-size-sm);
   line-height: 1.5;
   border-radius: var(--radius-md);
}

.f1-race-card__notice-icon {
   flex-shrink: 0;
   margin-top: 2px;
}

.f1-race-card__notice--success {
   color: var(--color-primary-hover);
   background: var(--color-success-bg);

   .f1-race-card__notice-icon {
      color: var(--color-primary);
   }
}

.f1-race-card__notice--info {
   margin-top: auto;
   color: var(--color-text-success);
   background: var(--color-primary-light);

   .f1-race-card__notice-icon {
      color: var(--color-primary);
   }
}
</style>
