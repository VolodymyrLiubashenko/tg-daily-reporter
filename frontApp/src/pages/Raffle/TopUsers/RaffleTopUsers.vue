<script setup lang="ts">
import Button from "@components/Button/Button.vue";
import Icon from "@components/Icon/Icon.vue";
import { VITE_API_URL } from "@/config";
import type { TChatUser } from "@/declarations/chatUser";
import { computed, ref } from "vue";
import { useGetRaffleUsers } from "../composables/useGetRaffleUsers";

const TOP_USERS_LIMIT = 5;

const { chatUsers, isLoadingChatUsers, isChatUsersError } = useGetRaffleUsers();

const isShowAllUsers = ref(false);
const failedAvatarUserIds = ref(new Set<string>());

const isCanToggleUsers = computed(() => chatUsers.value.length > TOP_USERS_LIMIT);

const visibleUsers = computed(() =>
   isShowAllUsers.value ? chatUsers.value : chatUsers.value.slice(0, TOP_USERS_LIMIT)
);

const toggleUsersButtonText = computed(() =>
   isShowAllUsers.value ? "Згорнути" : "Переглянути всі"
);

function getUserDisplayName(user: TChatUser) {
   if (user.username) {
      return `@${user.username}`;
   }

   const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

   return fullName || `ID ${user.telegramUserId}`;
}

function getUserInitial(user: TChatUser) {
   return getUserDisplayName(user).replace("@", "").trim().charAt(0).toUpperCase() || "?";
}

function getUserAvatarSrc(user: TChatUser) {
   const apiBaseUrl = VITE_API_URL || "/api";
   const normalizedApiBaseUrl = apiBaseUrl.replace(/\/$/, "");

   return `${normalizedApiBaseUrl}/telegram/users/${user.telegramUserId}/avatar`;
}

function shouldShowUserAvatar(user: TChatUser) {
   return !failedAvatarUserIds.value.has(user.telegramUserId);
}

function handleUserAvatarError(user: TChatUser) {
   failedAvatarUserIds.value = new Set(failedAvatarUserIds.value).add(user.telegramUserId);
}
</script>

<template>
   <section class="raffle-top-users">
      <header class="raffle-top-users__header">
         <div class="raffle-top-users__title-wrap">
            <Icon name="activity" :size="18" />
            <h2 class="raffle-top-users__title">Топ учасників</h2>
         </div>

         <Button
            v-if="isCanToggleUsers"
            variant="outline"
            :aria-expanded="isShowAllUsers"
            @click="isShowAllUsers = !isShowAllUsers"
         >
            {{ toggleUsersButtonText }}
         </Button>
      </header>

      <div v-if="isLoadingChatUsers" class="raffle-top-users__state">Завантажуємо учасників...</div>

      <div v-else-if="isChatUsersError" class="raffle-top-users__state">
         Не вдалося завантажити учасників.
      </div>

      <div v-else-if="!visibleUsers.length" class="raffle-top-users__state">
         Учасників поки немає.
      </div>

      <ol v-else class="raffle-top-users__list">
         <li
            v-for="(user, index) in visibleUsers"
            :key="user.telegramUserId"
            class="raffle-top-users__item"
         >
            <span class="raffle-top-users__rank" :class="`raffle-top-users__rank--${index + 1}`">
               {{ index + 1 }}
            </span>

            <span class="raffle-top-users__avatar" aria-hidden="true">
               <img
                  v-if="shouldShowUserAvatar(user)"
                  :src="getUserAvatarSrc(user)"
                  :alt="getUserDisplayName(user)"
                  loading="lazy"
                  @error="handleUserAvatarError(user)"
               />
               <span v-else class="raffle-top-users__avatar-fallback">
                  {{ getUserInitial(user) }}
               </span>
            </span>

            <span class="raffle-top-users__name">{{ getUserDisplayName(user) }}</span>

            <span class="raffle-top-users__count">{{ user.messageCountTotal }}</span>
         </li>
      </ol>
   </section>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.raffle-top-users {
   display: flex;
   flex-direction: column;
   padding: var(--space-4);
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-sm);

   @include mq-mobile {
      padding: var(--space-3);
   }
}

.raffle-top-users__header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: var(--space-3);
   padding-bottom: var(--space-3);
   border-bottom: 1px solid var(--color-border-light);

   @include mq-mobile {
      align-items: flex-start;
      flex-direction: column;
   }
}

.raffle-top-users__title-wrap {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   color: var(--color-primary);
}

.raffle-top-users__title {
   margin: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-md);
   font-weight: 800;
   line-height: 1.2;
}

.raffle-top-users__state {
   padding: var(--space-5) 0 var(--space-2);
   color: var(--color-text-secondary);
   font-size: var(--font-size-sm);
   line-height: 1.4;
   text-align: center;
}

.raffle-top-users__list {
   display: flex;
   flex-direction: column;
   margin: 0;
   padding: 0;
   list-style: none;
}

.raffle-top-users__item {
   display: grid;
   grid-template-columns: 32px 32px minmax(0, 1fr) auto;
   align-items: center;
   gap: var(--space-3);
   min-height: 44px;
   border-bottom: 1px solid var(--color-border-light);

   &:last-child {
      border-bottom: 0;
   }
}

.raffle-top-users__avatar,
.raffle-top-users__avatar-fallback {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 28px;
   height: 28px;
   border-radius: 50%;
}

.raffle-top-users__avatar {
   overflow: hidden;
   background: var(--color-surface-secondary);
   border: 1px solid var(--color-border-light);

   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
}

.raffle-top-users__avatar-fallback {
   color: var(--color-primary-hover);
   background: var(--color-success-bg);
   font-size: var(--font-size-xs);
   font-weight: 800;
   line-height: 1;
}

.raffle-top-users__rank {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 24px;
   height: 24px;
   color: var(--color-text-secondary);
   background: var(--color-surface-secondary);
   border-radius: 50%;
   font-size: var(--font-size-xs);
   font-weight: 800;
   line-height: 1;
}

.raffle-top-users__rank--1 {
   color: var(--color-medal-gold-text);
   background: var(--color-medal-gold-bg);
}

.raffle-top-users__rank--2 {
   color: var(--color-medal-silver-text);
   background: var(--color-medal-silver-bg);
}

.raffle-top-users__rank--3 {
   color: var(--color-medal-bronze-text);
   background: var(--color-medal-bronze-bg);
}

.raffle-top-users__name {
   min-width: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-sm);
   font-weight: 700;
   line-height: 1.2;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}

.raffle-top-users__count {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   min-width: 56px;
   padding: var(--space-1) var(--space-2);
   color: var(--color-primary-hover);
   background: var(--color-success-bg);
   border-radius: 999px;
   font-size: var(--font-size-xs);
   font-weight: 800;
   line-height: 1.2;
}
</style>
