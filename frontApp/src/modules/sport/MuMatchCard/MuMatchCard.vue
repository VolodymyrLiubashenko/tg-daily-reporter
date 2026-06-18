<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import type { IManchesterUnitedNextMatch } from "@/declarations/sport";
import { formatKyivMatchDate, formatKyivMatchTime } from "@/utils/date/day";
import { computed } from "vue";

type Props = {
   match: IManchesterUnitedNextMatch | null;
};

const props = defineProps<Props>();

const BANNER_SRC = "/images/mu-match-banner.png";

const matchDetails = computed(() => {
   if (!props.match) {
      return null;
   }

   const { time, timezone } = formatKyivMatchTime(props.match.utcDate);

   return {
      title: `Manchester United — ${props.match.opponent}`,
      date: formatKyivMatchDate(props.match.utcDate),
      time,
      timezone,
      competition: props.match.competition,
      stadium:
         props.match.venue === "home"
            ? "Олд Траффорд · Манчестер, Англія"
            : `На виїзді · ${props.match.opponent}`,
   };
});

const detailRows = computed(() => {
   if (!matchDetails.value) {
      return [];
   }

   return [
      { icon: "calendar" as const, label: "Дата", value: matchDetails.value.date },
      {
         icon: "clock" as const,
         label: "Час",
         value: matchDetails.value.time,
         note: `(${matchDetails.value.timezone})`,
      },
      { icon: "trophy" as const, label: "Турнір", value: matchDetails.value.competition },
      { icon: "mapPin" as const, label: "Стадіон", value: matchDetails.value.stadium },
   ];
});
</script>

<template>
   <article class="mu-match-card">
      <header class="mu-match-card__banner">
         <img
            class="mu-match-card__banner-image"
            :src="BANNER_SRC"
            alt="match banner"
            loading="lazy"
         />
      </header>

      <div class="mu-match-card__body">
         <template v-if="match && matchDetails">
            <div class="mu-match-card__headline">
               <h3 class="mu-match-card__title">{{ matchDetails.title }}</h3>
               <span class="mu-match-card__status">
                  <Icon name="calendar" :size="14" />
                  <span>Заплановано</span>
               </span>
            </div>

            <dl class="mu-match-card__details">
               <div v-for="row in detailRows" :key="row.label" class="mu-match-card__detail-row">
                  <dt class="mu-match-card__detail-label">
                     <Icon :name="row.icon" :size="18" class="mu-match-card__detail-icon" />
                     <span>{{ row.label }}</span>
                  </dt>
                  <dd class="mu-match-card__detail-value">
                     {{ row.value }}
                     <span v-if="row.note" class="mu-match-card__detail-note">{{ row.note }}</span>
                  </dd>
               </div>
            </dl>

            <p class="mu-match-card__notice mu-match-card__notice--success">
               <Icon name="circleCheck" :size="18" class="mu-match-card__notice-icon" />
               <span>Наступний матч підтверджено</span>
            </p>
         </template>

         <template v-else>
            <h3 class="mu-match-card__title">Manchester United</h3>

            <p class="mu-match-card__empty-status">
               <Icon name="calendar" :size="18" class="mu-match-card__empty-status-icon" />
               <span>Даних про наступний матч немає</span>
            </p>

            <p class="mu-match-card__notice mu-match-card__notice--info">
               <Icon name="info" :size="18" class="mu-match-card__notice-icon" />
               <span>
                  Міжсезоння. Інформація про наступний матч з'явиться ближче до початку сезону.
               </span>
            </p>
         </template>
      </div>
   </article>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;
.mu-match-card {
   overflow: hidden;
   width: 100%;
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-lg);
   box-shadow: var(--shadow-md);
   max-width: none;
   height: 100%;
}

.mu-match-card__banner {
   position: relative;
   aspect-ratio: 16 / 9;
   overflow: hidden;
   background: var(--color-surface-inverse);
}

.mu-match-card__banner-image {
   display: block;
   width: 100%;
   height: 100%;
   object-fit: cover;
   object-position: center;
}

.mu-match-card__matchup {
   position: absolute;
   inset: 0;
   z-index: 2;
   display: flex;
   align-items: center;
   justify-content: center;
   pointer-events: none;
}

.mu-match-card__body {
   display: flex;
   flex-direction: column;
   gap: var(--space-4);
   padding: var(--space-5);

   @include mq-mobile {
      gap: var(--space-3);
      padding: var(--space-2);
   }
}

.mu-match-card__headline {
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

.mu-match-card__title {
   margin: 0;
   font-size: var(--font-size-lg);
   font-weight: 700;
   line-height: 1.25;
   color: var(--color-text-primary);
}

.mu-match-card__status {
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

.mu-match-card__details {
   display: flex;
   flex-direction: column;
   gap: 0;
   margin: 0;
}

.mu-match-card__detail-row {
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

.mu-match-card__detail-label {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   margin: 0;
   font-size: var(--font-size-sm);
   font-weight: 500;
   color: var(--color-text-secondary);
}

.mu-match-card__detail-icon {
   color: var(--color-primary);
}

.mu-match-card__detail-value {
   margin: 0;
   font-size: var(--font-size-sm);
   font-weight: 600;
   line-height: 1.45;
   color: var(--color-text-primary);
}

.mu-match-card__detail-note {
   margin-left: var(--space-1);
   font-weight: 500;
   color: var(--color-text-muted);
}

.mu-match-card__empty-status {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   margin: 0;
   font-size: var(--font-size-sm);
   font-weight: 500;
   color: var(--color-text-secondary);
}

.mu-match-card__empty-status-icon {
   color: var(--color-text-muted);
}

.mu-match-card__notice {
   display: flex;
   align-items: flex-start;
   gap: var(--space-3);
   margin: 0;
   padding: var(--space-4);
   font-size: var(--font-size-sm);
   line-height: 1.5;
   border-radius: var(--radius-md);
}

.mu-match-card__notice-icon {
   flex-shrink: 0;
   margin-top: 2px;
}

.mu-match-card__notice--success {
   color: var(--color-primary-hover);
   background: var(--color-success-bg);

   .mu-match-card__notice-icon {
      color: var(--color-primary);
   }
}

.mu-match-card__notice--info {
   margin-top: auto;
   color: var(--color-text-success);
   background: var(--color-primary-light);

   .mu-match-card__notice-icon {
      color: var(--color-primary);
   }
}
</style>
