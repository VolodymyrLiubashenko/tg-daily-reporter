<script setup lang="ts">
import Input from "@components/controls/Input/Input.vue";
import { computed } from "vue";
import { useFormContext } from "vee-validate";

type Props = {
   name: string;
   label?: string;
   placeholder?: string;
   disabled?: boolean;
   id?: string;
   type?: string;
   error?: string;
};

const props = withDefaults(defineProps<Props>(), {
   label: undefined,
   placeholder: undefined,
   id: undefined,
   type: "text",
   error: undefined,
});

const form = useFormContext();
const [value, fieldProps] = form.defineField(props.name);

const errorMessage = computed(() => props.error ?? form.errors.value[props.name]);
</script>

<template>
   <Input
      :id="id"
      v-model="value"
      :name="name"
      :label="label"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      :error="errorMessage"
      v-bind="{ ...$attrs, ...fieldProps }"
   />
</template>
