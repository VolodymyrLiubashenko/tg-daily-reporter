<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import type { TIconName } from "@components/Icon/icons";
import { computed } from "vue";
import type { Component } from "vue";

type Props = {
   variant?: "primary" | "outline" | "pure";
   /** Іконка Lucide (як у `Icon`); опційно — після або перед текстом */
   icon?: TIconName;
   iconSize?: number;
   iconPosition?: "start" | "end";
   disabled?: boolean;
   type?: "button" | "submit" | "reset";
   as?: "button" | "a" | Component;
};

const props = withDefaults(defineProps<Props>(), {
   variant: "primary",
   iconPosition: "end",
   type: "button",
   icon: undefined,
   iconSize: 18,
   as: "button",
});

const isShowStartIcon = computed(() => !!props.icon && props.iconPosition === "start");
const isShowEndIcon = computed(() => !!props.icon && props.iconPosition === "end");
</script>

<template>
   <component
      :is="as"
      :type="type"
      class="btn"
      :class="[`btn--${variant}`, { 'btn--disabled': disabled }]"
      :disabled="disabled"
      v-bind="$attrs"
   >
      <span v-if="isShowStartIcon" class="btn__icon btn__icon--start">
         <Icon :name="props.icon!" :size="iconSize" />
      </span>
      <span class="btn__text">
         <slot />
      </span>
      <span v-if="isShowEndIcon" class="btn__icon btn__icon--end">
         <Icon :name="props.icon!" :size="iconSize" />
      </span>
   </component>
</template>

<style scoped lang="scss">
.btn {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   gap: var(--space-2);
   padding: var(--space-3) var(--space-5);
   font-family: var(--font-family);
   font-size: var(--font-size-sm);
   font-weight: 500;
   line-height: 1;
   border-radius: var(--radius-sm);
   border: 1px solid transparent;
   cursor: pointer;
   transition:
      background-color 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease,
      box-shadow 0.15s ease,
      opacity 0.15s ease;
   white-space: nowrap;

   &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
   }
}

.btn__text {
   display: inline-flex;
   align-items: center;
}

.btn__icon {
   display: inline-flex;
   flex-shrink: 0;
   color: currentColor;
}

.btn__icon :deep(svg) {
   color: currentColor;
}

.btn--primary {
   background: var(--color-primary);
   color: var(--color-text-white);
   border-color: var(--color-primary);

   &:hover:not(:disabled) {
      background: var(--color-primary-hover);
      border-color: var(--color-primary-hover);
   }
}

.btn--outline {
   background: var(--color-surface);
   color: var(--color-text-primary);
   border-color: var(--color-border);
   box-shadow: var(--shadow-sm);

   &:hover:not(:disabled) {
      background: var(--color-surface-secondary);
      border-color: var(--color-text-muted);
   }
}

.btn--pure {
   padding: 0;
   background: transparent;
   color: var(--color-text-primary);
   border-color: transparent;

   &:hover:not(:disabled) {
      color: var(--color-primary);
      background: transparent;
      border-color: transparent;
   }
}

.btn--disabled,
.btn:disabled {
   opacity: 0.55;
   cursor: not-allowed;
   box-shadow: none;
}
</style>
