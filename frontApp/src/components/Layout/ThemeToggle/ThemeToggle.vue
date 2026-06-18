<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import { useTheme } from "@/composables/useTheme";

const { isDarkTheme, toggleTheme } = useTheme();
</script>

<template>
   <button
      class="theme-toggle"
      :class="{ 'theme-toggle--dark': isDarkTheme }"
      type="button"
      role="switch"
      :aria-checked="isDarkTheme"
      :aria-label="isDarkTheme ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'"
      @click="toggleTheme"
   >
      <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
         <Icon name="sun" :size="22" :stroke-width="1.8" />
      </span>

      <span class="theme-toggle__thumb" aria-hidden="true"></span>

      <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
         <Icon name="moon" :size="22" :stroke-width="1.8" />
      </span>
   </button>
</template>

<style scoped lang="scss">
.theme-toggle {
   position: relative;
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   align-items: center;
   justify-items: center;
   width: 82px;
   height: 28px;
   padding: 0 3px;
   color: var(--color-text-muted);
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: 999px;
   box-shadow: var(--shadow-md);
   cursor: pointer;
}

.theme-toggle--dark {
   color: var(--color-text-secondary);
   background: var(--color-surface-inverse);
   border-color: var(--color-border);
}

.theme-toggle__icon {
   position: relative;
   z-index: 1;
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 18px;
   height: 18px;
   transition:
      color 0.2s ease,
      opacity 0.2s ease;
}

.theme-toggle__icon--sun {
   color: var(--color-text-muted);
}

.theme-toggle__icon--moon {
   color: var(--color-text-secondary);
}

.theme-toggle--dark .theme-toggle__icon--sun {
   color: var(--color-text-muted);
   opacity: 0.75;
}

.theme-toggle--dark .theme-toggle__icon--moon {
   color: var(--color-text-primary);
}

.theme-toggle__thumb {
   position: relative;
   z-index: 1;
   width: 14px;
   height: 14px;
   background: var(--color-primary);
   border-radius: 50%;
   box-shadow: var(--shadow-sm);
}

.theme-toggle:focus-visible {
   outline: 2px solid var(--color-primary);
   outline-offset: 3px;
}
</style>
