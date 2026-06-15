<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import type { TIconName } from "@components/Icon/icons";

type Props = {
   step: number;
   icon: TIconName;
   title: string;
   text: string;
};

defineProps<Props>();
</script>

<template>
   <article class="step-card">
      <div class="step-card__media">
         <span class="step-card__number">{{ step }}</span>
         <span class="step-card__icon" aria-hidden="true">
            <Icon :name="icon" :size="24" />
         </span>
      </div>

      <div class="step-card__content">
         <h3 class="step-card__title">{{ title }}</h3>
         <p class="step-card__text">{{ text }}</p>
      </div>
   </article>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.step-card {
   display: flex;
   align-items: center;
   gap: var(--space-4);
   min-width: 0;
   min-height: 96px;
   padding: var(--space-4);
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-sm);

   @include mq-mobile {
      align-items: flex-start;
   }
}

.step-card__media {
   display: inline-flex;
   align-items: center;
   gap: var(--space-3);
   flex-shrink: 0;
}

.step-card__number {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 32px;
   height: 32px;
   color: var(--color-primary);
   background: var(--color-success-bg);
   border-radius: 50%;
   font-size: var(--font-size-sm);
   font-weight: 800;
   line-height: 1;
}

.step-card__icon {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 48px;
   height: 48px;
   color: var(--color-primary);
   background: var(--color-success-bg);
   border-radius: 50%;
}

.step-card__content {
   display: flex;
   flex-direction: column;
   gap: var(--space-1);
   min-width: 0;
}

.step-card__title {
   margin: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-sm);
   font-weight: 800;
   line-height: 1.2;
}

.step-card__text {
   margin: 0;
   color: var(--color-text-secondary);
   font-size: var(--font-size-xs);
   line-height: 1.45;
}
</style>
