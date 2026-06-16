<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import type { TWeeklyWinner } from "@/declarations/weeklyWinner";
import { formatDateUk, parseKyivDate } from "@/utils/date/day";
import { computed } from "vue";
import { useGetRaffleUsers } from "../composables/useGetRaffleUsers";

const { chatUsers, weeklyWinners, isLoadingWeeklyWinners, isWeeklyWinnersError } = useGetRaffleUsers();

const messageCountByUserId = computed(
   () =>
      new Map(
         chatUsers.value.map((user) => [
            String(user.telegramUserId),
            user.messageCountTotal,
         ]),
      ),
);

function getWinnerDisplayName(winner: TWeeklyWinner) {
   const fullName = [winner.firstName].filter(Boolean).join(" ");

   return fullName || winner.username || `ID ${winner.telegramUserId}`;
}

function getWinnerUsername(winner: TWeeklyWinner) {
   return winner.username ? `@${winner.username}` : "";
}

function getWinnerMessageCount(winner: TWeeklyWinner) {
   return messageCountByUserId.value.get(String(winner.telegramUserId)) ?? null;
}

function formatWinnerDate(date: string) {
   return formatDateUk(date);
}

function formatWinnerTime(date: string) {
   return parseKyivDate(date).format("HH:mm");
}
</script>

<template>
   <section class="raffle-winners">
      <header class="raffle-winners__header">
         <div class="raffle-winners__title-wrap">
            <Icon name="trophy" :size="30" />
            <h2 class="raffle-winners__title">Усі переможці розіграшу</h2>
         </div>

         <p class="raffle-winners__description">
            Перегляньте список усіх переможців та виграних призів.
         </p>
      </header>

      <div v-if="isLoadingWeeklyWinners" class="raffle-winners__state">
         Завантажуємо переможців...
      </div>

      <div v-else-if="isWeeklyWinnersError" class="raffle-winners__state">
         Не вдалося завантажити список переможців.
      </div>

      <div v-else-if="!weeklyWinners.length" class="raffle-winners__state">
         Переможців поки немає.
      </div>

      <template v-else>
         <div class="raffle-winners__table-wrap">
            <table class="raffle-winners__table">
               <thead>
                  <tr>
                     <th>Дата розіграшу</th>
                     <th>Переможець</th>
                     <th>Повідомлень</th>
                     <th>Приз</th>
                     <th>Статус</th>
                  </tr>
               </thead>

               <tbody>
                  <tr v-for="winner in weeklyWinners" :key="winner.id">
                     <td>
                        <span class="raffle-winners__date">
                           <Icon name="calendar" :size="18" />
                           {{ formatWinnerDate(winner.pickedAt) }}
                           <span aria-hidden="true">•</span>
                           {{ formatWinnerTime(winner.pickedAt) }}
                        </span>
                     </td>

                     <td>
                        <span class="raffle-winners__person">
                           <strong>{{ getWinnerDisplayName(winner) }}</strong>
                           <span v-if="getWinnerUsername(winner)">{{ getWinnerUsername(winner) }}</span>
                        </span>
                     </td>

                     <td>{{ getWinnerMessageCount(winner) ?? "-" }}</td>

                     <td>
                        <span class="raffle-winners__prize">
                           <Icon name="beer" :size="28" />
                           Бокал пива
                        </span>
                     </td>

                     <td>
                        <span class="raffle-winners__status">
                           <Icon name="circleCheck" :size="16" />
                           Вручено
                        </span>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>

         <ul class="raffle-winners__cards" aria-label="Усі переможці розіграшу">
            <li v-for="winner in weeklyWinners" :key="winner.id" class="raffle-winners__card">
               <dl class="raffle-winners__card-grid">
                  <div class="raffle-winners__card-item">
                     <dt>
                        <Icon name="calendar" :size="16" />
                        Дата розіграшу
                     </dt>
                     <dd>{{ formatWinnerDate(winner.pickedAt) }}</dd>
                  </div>

                  <div class="raffle-winners__card-item">
                     <dt>Переможець</dt>
                     <dd>
                        <strong>{{ getWinnerDisplayName(winner) }}</strong>
                        <span v-if="getWinnerUsername(winner)">{{ getWinnerUsername(winner) }}</span>
                     </dd>
                  </div>

                  <div class="raffle-winners__card-item">
                     <dt>Повідомлень</dt>
                     <dd class="raffle-winners__messages">
                        <Icon name="telegram" :size="16" />
                        {{ getWinnerMessageCount(winner) ?? "-" }}
                     </dd>
                  </div>

                  <div class="raffle-winners__card-item">
                     <dt>
                        <Icon name="clock" :size="16" />
                        Час
                     </dt>
                     <dd>{{ formatWinnerTime(winner.pickedAt) }}</dd>
                  </div>
               </dl>

               <div class="raffle-winners__card-footer">
                  <span class="raffle-winners__prize">
                     <Icon name="beer" :size="22" />
                     Бокал пива
                  </span>

                  <span class="raffle-winners__card-status">
                     <span>Статус</span>
                     <span class="raffle-winners__status">
                        <Icon name="circleCheck" :size="14" />
                        Вручено
                     </span>
                  </span>
               </div>
            </li>
         </ul>
      </template>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.raffle-winners {
   margin: 0 var(--space-4) var(--space-6);
   padding: var(--space-5);
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-sm);

   @include mq-mobile {
      margin: 0 var(--space-3) var(--space-5);
      padding: 0;
      background: transparent;
      border: 0;
      box-shadow: none;
   }
}

.raffle-winners__header {
   margin-bottom: var(--space-5);

   @include mq-mobile {
      margin-bottom: var(--space-4);
      text-align: center;
   }
}

.raffle-winners__title-wrap {
   display: flex;
   align-items: center;
   gap: var(--space-3);
   color: var(--color-primary);

   @include mq-mobile {
      justify-content: center;
   }
}

.raffle-winners__title {
   margin: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-xl);
   font-weight: 800;
   line-height: 1.15;

   @include mq-mobile {
      font-size: var(--font-size-lg);
   }
}

.raffle-winners__description {
   margin: var(--space-3) 0 0;
   color: var(--color-text-secondary);
   font-size: var(--font-size-md);
   line-height: 1.4;

   @include mq-mobile {
      max-width: 280px;
      margin: var(--space-2) auto 0;
      font-size: var(--font-size-sm);
   }
}

.raffle-winners__state {
   padding: var(--space-6) 0;
   color: var(--color-text-secondary);
   font-size: var(--font-size-sm);
   line-height: 1.4;
   text-align: center;
}

.raffle-winners__table-wrap {
   overflow: hidden;
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);

   @include mq-mobile {
      display: none;
   }
}

.raffle-winners__table {
   width: 100%;
   border-collapse: collapse;
   color: var(--color-text-primary);
   font-size: var(--font-size-sm);
}

.raffle-winners__table th,
.raffle-winners__table td {
   padding: var(--space-4);
   text-align: left;
   border-bottom: 1px solid var(--color-border-light);
}

.raffle-winners__table th {
   color: var(--color-text-primary);
   font-weight: 800;
}

.raffle-winners__table tr:last-child td {
   border-bottom: 0;
}

.raffle-winners__date,
.raffle-winners__prize,
.raffle-winners__status,
.raffle-winners__messages {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
}

.raffle-winners__date {
   color: var(--color-text-secondary);
   white-space: nowrap;
}

.raffle-winners__date :deep(svg),
.raffle-winners__title-wrap :deep(svg) {
   color: var(--color-primary);
}

.raffle-winners__person {
   display: flex;
   flex-direction: column;
   gap: var(--space-1);
   min-width: 0;
}

.raffle-winners__person strong,
.raffle-winners__card-item strong {
   color: var(--color-text-primary);
   font-weight: 800;
   line-height: 1.2;
}

.raffle-winners__person span,
.raffle-winners__card-item span {
   color: var(--color-primary);
   font-size: var(--font-size-sm);
   font-weight: 700;
   line-height: 1.2;
}

.raffle-winners__prize {
   color: var(--color-text-primary);
   font-weight: 700;
}

.raffle-winners__prize :deep(svg) {
   color: var(--color-primary);
}

.raffle-winners__status {
   padding: var(--space-1) var(--space-2);
   color: var(--color-primary-hover);
   background: var(--color-success-bg);
   border: 1px solid var(--color-primary-light);
   border-radius: 999px;
   font-size: var(--font-size-xs);
   font-weight: 800;
   line-height: 1.2;
   white-space: nowrap;
}

.raffle-winners__cards {
   display: none;

   @include mq-mobile {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      margin: 0;
      padding: 0;
      list-style: none;
   }
}

.raffle-winners__card {
   padding: var(--space-3);
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-sm);
}

.raffle-winners__card-grid {
   display: grid;
   grid-template-columns: repeat(3, minmax(0, 1fr));
   gap: var(--space-3);
   margin: 0;
   padding-bottom: var(--space-3);
   border-bottom: 1px solid var(--color-border-light);
}

.raffle-winners__card-item {
   min-width: 0;
}

.raffle-winners__card-item dt {
   display: flex;
   align-items: center;
   gap: var(--space-1);
   margin-bottom: var(--space-1);
   color: var(--color-text-muted);
   font-size: 11px;
   font-weight: 700;
   line-height: 1.2;
}

.raffle-winners__card-item dt :deep(svg) {
   color: var(--color-primary);
}

.raffle-winners__card-item dd {
   display: flex;
   flex-direction: column;
   gap: 2px;
   min-width: 0;
   margin: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-sm);
   font-weight: 800;
   line-height: 1.2;
}

.raffle-winners__card-item dd strong,
.raffle-winners__card-item dd span {
   display: block;
   max-width: 100%;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}

.raffle-winners__card-item dd.raffle-winners__messages {
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
   color: var(--color-text-primary);
}

.raffle-winners__messages :deep(svg) {
   color: var(--color-primary);
}

.raffle-winners__card-footer {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: var(--space-3);
   padding-top: var(--space-3);
}

.raffle-winners__card-status {
   display: inline-flex;
   align-items: center;
   gap: var(--space-3);
}

.raffle-winners__card-status > span:first-child {
   color: var(--color-text-muted);
   font-size: 11px;
   font-weight: 700;
}
</style>
