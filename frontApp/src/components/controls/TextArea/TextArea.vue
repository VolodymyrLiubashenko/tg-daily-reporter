<script setup lang="ts">
import { computed } from "vue";

type Props = {
   modelValue: string;
   placeholder?: string;
   disabled?: boolean;
   label?: string;
   error?: string;
   name?: string;
   id?: string;
};

const props = defineProps<Props>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const value = computed({
   get: () => props.modelValue,
   set: (val: string) => emit("update:modelValue", val),
});
</script>

<template>
   <div class="text-area">
      <label v-if="label" class="text-area__label" :for="props.id || props.name">{{ label }}</label>
      <textarea
         :id="props.id || props.name"
         v-model="value"
         class="text-area__input"
         :placeholder="props.placeholder"
         :disabled="props.disabled"
         v-bind="$attrs"
      />
      <p v-if="error" class="text-area__error">{{ error }}</p>
   </div>
</template>

<style scoped lang="scss">
.text-area {
   display: flex;
   flex-direction: column;
   gap: var(--space-2);
   width: 100%;
}

.text-area__label {
   color: var(--color-text-primary);
   font-size: var(--font-size-sm);
   font-weight: 700;
   line-height: 1.25;
}

.text-area__input {
   width: 100%;
   min-height: 120px;
   padding: var(--space-3);
   color: var(--color-text-primary);
   background: var(--color-surface);
   border: 1px solid var(--color-border);
   border-radius: var(--radius-sm);
   box-shadow: var(--shadow-sm);
   font: inherit;
   font-size: var(--font-size-sm);
   line-height: 1.4;
   outline: none;
   resize: vertical;
   transition:
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      background-color 0.18s ease,
      color 0.18s ease;

   &::placeholder {
      color: var(--color-text-muted);
   }

   &:hover:not(:disabled) {
      border-color: var(--color-text-muted);
   }

   &:focus-visible {
      border-color: var(--color-primary);
      box-shadow:
         var(--shadow-sm),
         0 0 0 3px color-mix(in srgb, var(--color-primary) 22%, transparent);
   }

   &:disabled {
      color: var(--color-text-muted);
      background: var(--color-surface-secondary);
      cursor: not-allowed;
      opacity: 0.75;
   }
}

.text-area:has(.text-area__error) {
   .text-area__input {
      border-color: var(--color-danger);

      &:focus-visible {
         border-color: var(--color-danger);
         box-shadow:
            var(--shadow-sm),
            0 0 0 3px color-mix(in srgb, var(--color-danger) 18%, transparent);
      }
   }
}

.text-area__error {
   margin: 0;
   color: var(--color-danger);
   font-size: var(--font-size-xs);
   font-weight: 600;
   line-height: 1.35;
}
</style>
