<script setup lang="ts">
import FeatureCard from "@components/FeatureCard/FeatureCard.vue";
import type { TIconName } from "@components/Icon/icons";
import type { TChatUser } from "@/declarations/chatUser";
import { computed } from "vue";
import { useGetRaffleUsers } from "../composables/useGetRaffleUsers";

type RaffleStat = {
   icon: TIconName;
   label: string;
   value: string;
};

const { chatUsers, isLoadingChatUsers, isChatUsersError } = useGetRaffleUsers();

const numberFormatter = new Intl.NumberFormat("uk-UA");

const totalMessages = computed(() =>
   chatUsers.value.reduce((messagesSum, user) => messagesSum + user.messageCountTotal, 0),
);

const mostActiveUser = computed(() => chatUsers.value[0] ?? null);

const raffleStats = computed<RaffleStat[]>(() => [
   {
      icon: "users",
      label: "Учасників",
      value: formatStatValue(chatUsers.value.length),
   },
   {
      icon: "telegram",
      label: "Усього повідомлень",
      value: formatStatValue(totalMessages.value),
   },
   {
      icon: "user",
      label: "Найактивніший учасник",
      value: formatMostActiveUser(mostActiveUser.value),
   },
   {
      icon: "gift",
      label: "Приз цього тижня",
      value: "Бокал пива",
   },
]);

function formatStatValue(value: number) {
   if (isLoadingChatUsers.value) {
      return "...";
   }

   if (isChatUsersError.value) {
      return "-";
   }

   return numberFormatter.format(value);
}

function formatMostActiveUser(user: TChatUser | null) {
   if (isLoadingChatUsers.value) {
      return "...";
   }

   if (isChatUsersError.value || !user) {
      return "-";
   }

   if (user.username) {
      return `@${user.username}`;
   }

   const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

   return fullName || `ID ${user.telegramUserId}`;
}
</script>

<template>
   <div class="raffle-banner__stats" aria-label="Статистика розіграшу">
      <FeatureCard
         v-for="stat in raffleStats"
         :key="stat.label"
         class="raffle-banner__stat-card"
         :icon="stat.icon"
         :title="stat.value"
         :description="stat.label"
      />
   </div>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.raffle-banner__stats {
   display: grid;
   grid-template-columns: repeat(4, minmax(0, 1fr));
   gap: var(--space-4);

   @include mq-tablet {
      grid-template-columns: repeat(2, minmax(0, 1fr));
   }

   @include mq-mobile {
      grid-template-columns: 1fr;
      gap: var(--space-3);
   }
}

.raffle-banner__stat-card {
   min-height: 108px;
   align-items: center;
   padding: var(--space-4);
   border-color: var(--color-border);
   border-radius: var(--radius-md);

   @include mq-mobile {
      flex-direction: row;
      min-height: 64px;
      padding: var(--space-3);
   }
}

.raffle-banner__stat-card :deep(.feature-card__title) {
   max-width: 100%;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}
</style>
