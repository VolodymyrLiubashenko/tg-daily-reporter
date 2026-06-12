<script setup lang="ts">
import Button from "@components/Button/Button.vue";
import { useAuth } from "@/composables/useAuth";
import { onMounted, onUnmounted, ref } from "vue";

/**
 * Refs
 */
const isOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

const { user, logout } = useAuth();

/**
 * Handlers
 */

const handleToggleUserMenu = () => {
   isOpen.value = !isOpen.value;
};

const handleCloseUserMenu = () => {
   isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
   if (!isOpen.value) {
      return;
   }

   const target = event.target as Node;

   if (triggerRef.value?.contains(target) || dropdownRef.value?.contains(target)) {
      return;
   }

   handleCloseUserMenu();
};

const handleCopyUserEmail = () => {
   if (user.value?.email) {
      navigator.clipboard.writeText(user.value.email);
   }
};

/**
 * Hooks
 */
onMounted(() => {
   document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
   document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
   <div class="user-menu">
      <div ref="triggerRef" class="user-menu__trigger" @click="handleToggleUserMenu">
         <button variant="pure" icon="user" :icon-size="24">
            <img :src="user?.photo" :alt="user?.displayName" class="user-menu__avatar" />
         </button>
         <span class="user-menu__avatar-status">
            <span class="user-menu__avatar-status-dot"></span>
         </span>
      </div>

      <Transition name="user-menu-dropdown">
         <div v-if="isOpen" ref="dropdownRef" class="user-menu__dropdown">
            <div class="user-menu__dropdown-header">
               <span v-show="user?.displayName" class="user-menu__dropdown-header-title">
                  {{ user?.displayName }}
               </span>
               <div v-show="user?.email" class="user-menu__dropdown-header-email-container">
                  <span class="user-menu__dropdown-header-email">{{ user?.email }}</span>
                  <Button
                     variant="pure"
                     icon="copy"
                     :icon-size="16"
                     @click="handleCopyUserEmail"
                  ></Button>
               </div>
            </div>
            <ul class="user-menu__dropdown-list">
               <li class="user-menu__dropdown-item user-menu__dropdown-item--logout">
                  <Button variant="pure" icon="logout" :icon-size="24" @click="logout"
                     >Logout</Button
                  >
               </li>
            </ul>
         </div>
      </Transition>
   </div>
</template>

<style scoped lang="scss">
.user-menu {
   position: relative;
}

.user-menu__trigger {
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 32px;
   height: 32px;

   border-radius: 50%;
   cursor: pointer;
}

.user-menu__avatar {
   width: 100%;
   height: 100%;
   border-radius: 50%;
}

.user-menu__avatar-status {
   position: absolute;
   bottom: 0;
   right: 0;
   width: 10px;
   height: 10px;
   border-radius: 50%;
   background-color: var(--color-success);
}

.user-menu__dropdown {
   position: absolute;
   top: calc(100% + var(--space-2));
   right: 0;
   min-width: 200px;
   padding: var(--space-4);
   background-color: var(--color-surface);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-lg);
   z-index: 1000;
}

.user-menu-dropdown-enter-active,
.user-menu-dropdown-leave-active {
   transition:
      opacity 0.2s ease-in-out,
      transform 0.2s ease-in-out;
}

.user-menu-dropdown-enter-from,
.user-menu-dropdown-leave-to {
   opacity: 0;
   transform: translateY(var(--space-2));
}

.user-menu-dropdown-enter-to,
.user-menu-dropdown-leave-from {
   opacity: 1;
   transform: translateY(0);
}

.user-menu__dropdown-header {
   display: flex;
   flex-direction: column;
   gap: var(--space-1);
   margin-bottom: var(--space-4);
}

.user-menu__dropdown-header-title {
   font-size: var(--font-size-md);
   font-weight: 600;
   color: var(--color-text-primary);
}

.user-menu__dropdown-header-email-container {
   display: flex;
   align-items: center;
   gap: var(--space-2);

   &:deep(.btn) {
      color: var(--color-text-secondary);
      &:hover {
         color: var(--color-text-primary);
      }
   }
}

.user-menu__dropdown-header-email {
   font-size: var(--font-size-sm);
   color: var(--color-text-secondary);
}

.user-menu__dropdown-item--logout {
   margin-top: var(--space-4);

   &:deep(.btn) {
      color: var(--color-danger);
      &:hover {
         color: var(--color-danger-hover);
      }
   }
}
</style>
