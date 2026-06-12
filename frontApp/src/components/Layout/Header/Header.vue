<script setup lang="ts">
import { getHomePath, getAboutPath, getBeerPath, getRafflePath } from "@router/paths";
import Icon from "@components/Icon/Icon.vue";
import Button from "@components/Button/Button.vue";
import { useMediaQueries } from "@/composables/useMediaQuery";
import { useAuth } from "@/composables/useAuth";
import UserMenu from "./UserMenu/UserMenu.vue";
import MobileMenu from "./MobileMenu/MobileMenu.vue";

const { isAuthenticated, loginWithGoogle } = useAuth();
const { isMobile } = useMediaQueries();

const handleLoginWithGoogle = () => {
   loginWithGoogle();
};
</script>

<template>
   <header class="header">
      <div class="header__container">
         <RouterLink :to="getHomePath()">
            <div class="header__logo">
               <Icon name="telegram" :size="48" />
               <span class="header__logo-text">TG Daily Reporter</span>
            </div>
         </RouterLink>

         <div v-if="!isMobile" class="header__navigation">
            <RouterLink :to="getHomePath()">Головна</RouterLink>
            <RouterLink :to="getRafflePath()">Розіграш</RouterLink>
            <RouterLink :to="getBeerPath()">Пиво</RouterLink>
            <RouterLink :to="getAboutPath()">Про бота</RouterLink>
         </div>

         <div v-if="!isMobile && !isAuthenticated" class="header__actions">
            <Button variant="primary" icon="user" @click="handleLoginWithGoogle"
               >Login with Google</Button
            >
         </div>

         <div v-if="!isMobile && isAuthenticated" class="header__actions">
            <UserMenu />
         </div>

         <div v-if="isMobile" class="header__menu">
            <MobileMenu :is-authenticated="isAuthenticated" />
         </div>
      </div>
   </header>
</template>

<style scoped lang="scss">
.header {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   background: var(--color-surface);
   box-shadow: var(--shadow-sm);
   z-index: 1000;
}

.header__container {
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
   padding: var(--space-3) var(--space-5);
}

.header__logo {
   display: flex;
   align-items: center;
   gap: var(--space-2);

   .header__logo-text {
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--color-text-primary);
   }
}

.header__navigation {
   display: flex;
   align-items: center;
   gap: var(--space-6);

   a {
      transition: color 0.3s ease;
   }

   a:hover {
      color: var(--color-primary);
   }

   .router-link-exact-active {
      color: var(--color-primary);
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 12px;
      text-decoration-thickness: 2px;
      text-decoration-color: var(--color-primary);
      text-decoration-style: solid;
      text-decoration-skip-ink: none;
      text-decoration-skip-ink: none;
   }
}

.header__actions {
   display: flex;
   align-items: center;
   gap: var(--space-3);

   button {
      padding: var(--space-2) var(--space-4);
      font-size: var(--font-size-sm);
      font-weight: 500;
   }
}

.header__menu {
   display: flex;
   align-items: center;
   gap: var(--space-3);
}
</style>
