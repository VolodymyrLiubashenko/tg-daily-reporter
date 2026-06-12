<script setup lang="ts">
import { icons, TIconName } from "./icons";
import { computed } from "vue";

type Props = {
   name: TIconName;
   size?: number;
   strokeWidth?: number;
};

const props = withDefaults(defineProps<Props>(), {
   size: 20,
   strokeWidth: 2,
});

const icon = computed(() => icons[props.name]);
</script>

<template>
   <span class="icon" :style="{ width: `${size}px`, height: `${size}px` }">
      <component :is="icon" :stroke-width="strokeWidth" />
   </span>
</template>

<style scoped lang="scss">
.icon {
   display: inline-flex;
   flex-shrink: 0;
}

.icon :deep(svg) {
   width: 100%;
   height: 100%;
   color: currentColor;
}
</style>
