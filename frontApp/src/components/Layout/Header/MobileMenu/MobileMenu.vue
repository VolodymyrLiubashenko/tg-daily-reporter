<script setup lang="ts">
import Popup from "@components/Popup/Popup.vue";
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import Button from "@components/Button/Button.vue";
import { getHomePath, getAboutPath, getAdminPath, getBeerPath, getRafflePath } from "@router/paths";
import Icon from "@components/Icon/Icon.vue";
import UserMenu from "../UserMenu/UserMenu.vue";

const { loginWithGoogle, logout } = useAuth();

const isOpen = ref(false);

const handleTogglePopup = (open: boolean) => {
   isOpen.value = open;
};

const handleLoginWithGoogle = () => {
   loginWithGoogle();
};

const handleLogout = () => {
   logout();
};

type Props = {
   isAuthenticated: boolean;
   isAdmin: boolean;
};
const props = defineProps<Props>();
</script>

<template>
   <Button variant="pure" icon="menu" :icon-size="24" @click="handleTogglePopup"></Button>
   <Popup as-trigger-child :is-open="isOpen" size="full" @open-change="handleTogglePopup">
      <!-- <template #title> Mobile Menu </template> -->
      <template #description>
         <div class="mobile-menu__description">
            <div class="mobile-menu__logo">
               <div class="mobile-menu__logo-brand">
                  <Icon name="telegram" :size="48" />
                  <span class="mobile-menu__logo-text">TG Daily Reporter</span>
               </div>
               <UserMenu v-if="props.isAuthenticated" />
            </div>
            <ul class="mobile-menu__description-list">
               <li class="mobile-menu__description-item">
                  <RouterLink :to="getHomePath()">Головна</RouterLink>
               </li>
               <li class="mobile-menu__description-item">
                  <RouterLink :to="getRafflePath()">Розіграш</RouterLink>
               </li>
               <li class="mobile-menu__description-item">
                  <RouterLink :to="getBeerPath()">Пиво</RouterLink>
               </li>
               <li class="mobile-menu__description-item">
                  <RouterLink :to="getAboutPath()">Про бота</RouterLink>
               </li>
               <li v-if="props.isAdmin" class="mobile-menu__description-item">
                  <RouterLink :to="getAdminPath()">Адмін</RouterLink>
               </li>
            </ul>
         </div>
      </template>
      <template #actions>
         <div v-if="!props.isAuthenticated">
            <Button variant="primary" icon="user" @click="handleLoginWithGoogle"
               >Login with Google</Button
            >
         </div>
         <div v-else>
            <Button variant="primary" icon="user" @click="handleLogout">Logout</Button>
         </div>
      </template>
   </Popup>
</template>

<style scoped lang="scss">
.mobile-menu {
   &__description {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: var(--space-4) 0 0;
   }

   &__logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
      padding-right: var(--space-7);

      :deep(.user-menu__trigger) {
         width: 36px;
         height: 36px;
      }
   }

   &__logo-brand {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      min-width: 0;
   }

   &__logo-text {
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--color-text-primary);
   }

   &__description-list {
      display: flex;
      flex-direction: column;

      padding-top: var(--space-4);
   }

   &__description-item {
      a {
         display: block;
         font-size: var(--font-size-md);
         font-weight: 500;
         color: var(--color-primary);
         text-decoration: none;
         padding: var(--space-4);
         &.router-link-exact-active {
            background-color: var(--color-primary-light);
         }
      }
   }
}
</style>
