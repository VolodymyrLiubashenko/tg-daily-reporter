<script setup lang="ts">
import TextArea from "../../TextArea/TextArea.vue";
import { useFormContext } from "vee-validate";
import { computed } from "vue";

type Props = {
   name: string;
   id?: string;
   placeholder?: string;
   label?: string;
   error?: string;
   disabled?: boolean;
};

const props = defineProps<Props>();

const form = useFormContext();
const [value, fieldProps] = form.defineField(props.name);

const errorMessage = computed(() => props.error ?? form.errors.value[props.name]);
</script>

<template>
   <TextArea
      :id="props.name || props.id"
      v-model="value"
      class="form-text-area"
      :placeholder="props.placeholder"
      :label="props.label"
      :error="errorMessage"
      :disabled="props.disabled"
      v-bind="{ ...$attrs, ...fieldProps }"
   />
</template>
