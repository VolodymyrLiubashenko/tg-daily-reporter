<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import type { TIconName } from "@components/Icon/icons";
import { computed } from "vue";
import { RouterLink } from "vue-router";

type Props = {
   icon: TIconName;
   title: string;
   description: string;
   linkText?: string;
   linkHref?: string;
};

const props = defineProps<Props>();

const hasLink = computed(() => Boolean(props.linkText && props.linkHref));

const isInternalLink = computed(
   () =>
      hasLink.value &&
      props.linkHref!.startsWith("/") &&
      !props.linkHref!.startsWith("//"),
);
</script>

<template>
   <article class="feature-card">
      <div class="feature-card__icon" aria-hidden="true">
         <Icon :name="icon" :size="24" />
      </div>

      <div class="feature-card__content">
         <h3 class="feature-card__title">{{ title }}</h3>
         <p class="feature-card__description">{{ description }}</p>

         <RouterLink v-if="hasLink && isInternalLink" :to="linkHref!" class="feature-card__link">
            <span>{{ linkText }}</span>
            <Icon name="arrowRight" :size="18" />
         </RouterLink>
         <a
            v-else-if="hasLink"
            :href="linkHref"
            class="feature-card__link"
            target="_blank"
            rel="noopener noreferrer"
         >
            <span>{{ linkText }}</span>
            <Icon name="arrowRight" :size="18" />
         </a>
      </div>
   </article>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.feature-card {
   display: flex;
   align-items: flex-start;
   gap: var(--space-4);
   padding: var(--space-5);
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-lg);
   box-shadow: var(--shadow-sm);

   @include mq-mobile {
      flex-direction: column;
      gap: var(--space-3);
      padding: var(--space-4);
   }
}

.feature-card__icon {
   display: inline-flex;
   flex-shrink: 0;
   align-items: center;
   justify-content: center;
   width: 52px;
   height: 52px;
   color: var(--color-primary-hover);
   background: var(--color-primary-light);
   border-radius: 999px;
}

.feature-card__content {
   display: flex;
   flex: 1;
   flex-direction: column;
   align-items: flex-start;
   gap: var(--space-2);
   min-width: 0;
}

.feature-card__title {
   margin: 0;
   font-size: var(--font-size-md);
   font-weight: 700;
   line-height: 1.3;
   color: var(--color-text-success);
}

.feature-card__description {
   margin: 0;
   font-size: var(--font-size-sm);
   line-height: 1.55;
   color: var(--color-text-secondary);
}

.feature-card__link {
   display: inline-flex;
   align-items: center;
   gap: var(--space-1);
   margin-top: var(--space-1);
   font-size: var(--font-size-sm);
   font-weight: 600;
   line-height: 1.2;
   color: var(--color-primary-hover);
   text-decoration: none;
   transition: color 0.15s ease;

   &:hover {
      color: var(--color-primary);
   }

   &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
   }
}
</style>
