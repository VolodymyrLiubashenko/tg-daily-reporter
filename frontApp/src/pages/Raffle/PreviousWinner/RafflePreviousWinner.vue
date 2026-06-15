<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import type { TWeeklyWinner } from "@/declarations/weeklyWinner";
import { formatDateUk } from "@/utils/date/day";
import { computed } from "vue";
import { useGetRaffleUsers } from "../composables/useGetRaffleUsers";

const { weeklyWinners, isLoadingWeeklyWinners, isWeeklyWinnersError } = useGetRaffleUsers();

const previousWinner = computed(() => weeklyWinners.value[0] ?? null);

function getWinnerDisplayName(winner: TWeeklyWinner) {
   if (winner.username) {
      return `@${winner.username}`;
   }

   return winner.firstName || `ID ${winner.telegramUserId}`;
}
</script>

<template>
   <section class="raffle-previous-winner">
      <header class="raffle-previous-winner__header">
         <Icon name="trophy" :size="18" />
         <h2 class="raffle-previous-winner__title">Попередній переможець</h2>
      </header>

      <div v-if="isLoadingWeeklyWinners" class="raffle-previous-winner__state">
         Завантажуємо переможця...
      </div>

      <div v-else-if="isWeeklyWinnersError" class="raffle-previous-winner__state">
         Не вдалося завантажити переможця.
      </div>

      <div v-else-if="!previousWinner" class="raffle-previous-winner__state">
         Переможців поки немає.
      </div>

      <template v-else>
         <div class="raffle-previous-winner__profile">
            <span class="raffle-previous-winner__avatar" aria-hidden="true">
               <Icon name="gift" :size="36" />
            </span>

            <div class="raffle-previous-winner__meta">
               <strong class="raffle-previous-winner__name">
                  {{ getWinnerDisplayName(previousWinner) }}
               </strong>
               <span class="raffle-previous-winner__date">
                  Переможець від {{ formatDateUk(previousWinner.pickedAt) }}
               </span>
            </div>
         </div>

         <div class="raffle-previous-winner__prize">
            <strong>Виграш: <span>Бокал пива</span></strong>
            <p>Вітаємо та дякуємо за активність!</p>
         </div>
      </template>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.raffle-previous-winner {
   display: flex;
   flex-direction: column;
   gap: var(--space-5);
   padding: var(--space-4);
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-sm);
}

.raffle-previous-winner__header {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   color: var(--color-primary);
}

.raffle-previous-winner__title {
   margin: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-md);
   font-weight: 800;
   line-height: 1.2;
}

.raffle-previous-winner__state {
   display: flex;
   align-items: center;
   justify-content: center;
   min-height: 156px;
   color: var(--color-text-secondary);
   font-size: var(--font-size-sm);
   line-height: 1.4;
   text-align: center;
}

.raffle-previous-winner__profile {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: var(--space-5);

   @include mq-mobile {
      justify-content: flex-start;
      gap: var(--space-4);
   }
}

.raffle-previous-winner__avatar {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   flex: 0 0 88px;
   width: 88px;
   height: 88px;
   color: var(--color-primary);
   background: var(--color-success-bg);
   border-radius: 50%;
}

.raffle-previous-winner__meta {
   display: flex;
   flex-direction: column;
   gap: var(--space-2);
   min-width: 0;
}

.raffle-previous-winner__name {
   color: var(--color-text-primary);
   font-size: var(--font-size-md);
   font-weight: 800;
   line-height: 1.2;
   overflow-wrap: anywhere;
}

.raffle-previous-winner__date {
   color: var(--color-text-secondary);
   font-size: var(--font-size-sm);
   font-weight: 500;
   line-height: 1.2;
}

.raffle-previous-winner__prize {
   padding: var(--space-4);
   background: var(--color-success-bg);
   border: 1px solid var(--color-primary-light);
   border-radius: var(--radius-sm);
}

.raffle-previous-winner__prize strong {
   display: block;
   margin-bottom: var(--space-2);
   color: var(--color-text-primary);
   font-size: var(--font-size-sm);
   font-weight: 800;
   line-height: 1.2;
}

.raffle-previous-winner__prize span {
   color: var(--color-primary-hover);
}

.raffle-previous-winner__prize p {
   margin: 0;
   color: var(--color-text-secondary);
   font-size: var(--font-size-sm);
   line-height: 1.35;
}
</style>
