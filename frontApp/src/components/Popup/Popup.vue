<script setup lang="ts">
import {
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogOverlay,
   DialogPortal,
   DialogRoot,
   DialogTitle,
   DialogTrigger,
} from "reka-ui";
import { useSlots } from "vue";
import Button from "../Button/Button.vue";

type Props = {
   asTriggerChild?: boolean;
   isWithTrigger?: boolean;
   isOpen?: boolean;
   onOpenChange?: (open: boolean) => void;
   to?: string;
   size?: "md" | "full";
   position?: "left" | "right" | "center";
};

const props = withDefaults(defineProps<Props>(), {
   asTriggerChild: true,
   isWithTrigger: false,
   isOpen: false,
   onOpenChange: () => {},
   to: undefined,
   size: "md",
   position: "center",
});

const slots = useSlots();
</script>

<template>
   <DialogRoot :open="props.isOpen" @update:open="props.onOpenChange">
      <DialogTrigger v-if="props.isWithTrigger" :as-child="props.asTriggerChild">
         <slot name="trigger" />
      </DialogTrigger>
      <DialogPortal :to="props.to">
         <Transition name="popup">
            <DialogOverlay class="popup__overlay" />
         </Transition>
         <Transition name="popup">
            <DialogContent
               v-if="props.isOpen"
               class="popup__content"
               :class="[`popup__content--${props.size}`, `popup__content--${props.position}`]"
            >
               <DialogTitle v-if="slots.title" class="popup__title">
                  <slot name="title" />
               </DialogTitle>
               <DialogDescription v-if="slots.description" class="popup__description">
                  <slot name="description" />
               </DialogDescription>
               <div v-if="slots.actions" class="popup__content-actions">
                  <slot name="actions" />
               </div>
               <DialogClose :as-child="true">
                  <Button
                     variant="pure"
                     icon="close"
                     :icon-size="24"
                     class="popup__close"
                     @click="() => props.onOpenChange(false)"
                  />
               </DialogClose>
            </DialogContent>
         </Transition>
      </DialogPortal>
   </DialogRoot>
</template>

<style scoped lang="scss">
.popup {
   &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
   }
   &__content {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: 0;
      background-color: var(--color-surface);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      // sizes
      &--md {
         width: 400px;
         height: unset;
         min-height: 400px;
      }
      &--full {
         width: 100%;
         height: 100dvh;
         border-radius: 0;
      }
      // positions
      &--left {
         left: 0;
      }
      &--right {
         right: 0;
      }
      &--center {
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
      }
   }

   &__close {
      position: absolute;
      top: var(--space-4);
      right: var(--space-2);
   }

   &__title {
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--color-text-secondary);
      background-color: var(--color-surface-secondary);
      padding: var(--space-4);
   }

   &__description {
      flex: 1;
      font-size: var(--font-size-md);
      color: var(--color-text-primary);
      line-height: 1.5;
      padding: var(--space-4) var(--space-4) 80px;
   }

   &__content-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      gap: var(--space-2);
      padding: var(--space-4);
      border-top: 1px solid var(--color-border);
   }
}
.popup-enter-active {
   transition: opacity 0.2s ease-in-out;
}

.popup-leave-active {
   transition: opacity 0s ease-in-out;
}

.popup-enter-from,
.popup-leave-to {
   opacity: 0;
}

.popup-enter-to,
.popup-leave-from {
   opacity: 1;
}
</style>
