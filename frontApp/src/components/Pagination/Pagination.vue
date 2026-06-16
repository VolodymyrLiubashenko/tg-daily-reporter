<script setup lang="ts">
import { computed, watch } from "vue";
import { VueAwesomePaginate } from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import Icon from "@components/Icon/Icon.vue";
import { useMediaQueries } from "@/composables/useMediaQuery";

type Props = {
   modelValue: number;
   totalItems: number;
   itemsPerPage?: number;
   maxPagesShown?: number;
   disabled?: boolean;
   ariaLabel?: string;
};

const props = withDefaults(defineProps<Props>(), {
   itemsPerPage: 10,
   maxPagesShown: 7,
   disabled: false,
   ariaLabel: "Пагінація",
});

const emit = defineEmits<{
   "update:modelValue": [page: number];
   change: [page: number];
}>();

const { isMobile } = useMediaQueries();

const totalPages = computed(() => Math.max(Math.ceil(props.totalItems / props.itemsPerPage), 1));

const currentPage = computed({
   get: () => clampPage(props.modelValue),
   set: (page: number) => setPage(page),
});

const isFirstPage = computed(() => currentPage.value <= 1);
const isLastPage = computed(() => currentPage.value >= totalPages.value);

watch(totalPages, () => {
   if (props.modelValue !== currentPage.value) {
      emit("update:modelValue", currentPage.value);
      emit("change", currentPage.value);
   }
});

function clampPage(page: number) {
   return Math.min(Math.max(page, 1), totalPages.value);
}

function setPage(page: number) {
   if (props.disabled) {
      return;
   }

   const nextPage = clampPage(page);

   if (nextPage === props.modelValue) {
      return;
   }

   emit("update:modelValue", nextPage);
   emit("change", nextPage);
}

function goToPreviousPage() {
   setPage(currentPage.value - 1);
}

function goToNextPage() {
   setPage(currentPage.value + 1);
}
</script>

<template>
   <nav class="pagination" :aria-label="ariaLabel">
      <VueAwesomePaginate
         v-if="!isMobile"
         v-model="currentPage"
         class="pagination__desktop"
         :total-items="totalItems"
         :items-per-page="itemsPerPage"
         :max-pages-shown="maxPagesShown"
         :disable-pagination="disabled"
         :show-breakpoint-buttons="false"
         pagination-container-class="pagination__list"
         paginate-buttons-class="pagination__button"
         number-buttons-class="pagination__number"
         back-button-class="pagination__nav pagination__nav--prev"
         next-button-class="pagination__nav pagination__nav--next"
         active-page-class="pagination__button--active"
         disabled-paginate-buttons-class="pagination__button--disabled"
         starting-breakpoint-content="..."
         ending-breakpoint-button-content="..."
      >
         <template #prev-button>
            <span class="pagination__nav-content">
               <Icon name="chevronLeft" :size="18" />
               <span>Попередня</span>
            </span>
         </template>

         <template #next-button>
            <span class="pagination__nav-content">
               <span>Наступна</span>
               <Icon name="chevronRight" :size="18" />
            </span>
         </template>
      </VueAwesomePaginate>

      <div v-else class="pagination__mobile">
         <button
            class="pagination__mobile-button"
            type="button"
            :disabled="disabled || isFirstPage"
            aria-label="Попередня сторінка"
            @click="goToPreviousPage"
         >
            <Icon name="chevronLeft" :size="18" />
         </button>

         <span class="pagination__mobile-current">
            <strong>{{ currentPage }}</strong>
            <span>/</span>
            <span>{{ totalPages }}</span>
         </span>

         <button
            class="pagination__mobile-button pagination__mobile-button--next"
            type="button"
            :disabled="disabled || isLastPage"
            aria-label="Наступна сторінка"
            @click="goToNextPage"
         >
            <Icon name="chevronRight" :size="18" />
         </button>
      </div>
   </nav>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.pagination {
   display: flex;
   justify-content: center;
   width: 100%;
}

.pagination__desktop {
   display: block;

   @include mq-mobile {
      display: none;
   }
}

.pagination__mobile {
   display: none;

   @include mq-mobile {
      display: inline-grid;
      grid-template-columns: 40px minmax(72px, 1fr) 40px;
      align-items: center;
      gap: var(--space-3);
      min-width: 220px;
      min-height: 48px;
      padding: var(--space-2);
      background: var(--color-surface);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
   }
}

:deep(.pagination__list) {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   min-height: 56px;
   margin: 0;
   padding: var(--space-2);
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-sm);
}

:deep(.pagination__button) {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   min-width: 40px;
   height: 40px;
   padding: 0 var(--space-3);
   color: var(--color-text-primary);
   background: transparent;
   border: 1px solid transparent;
   border-radius: var(--radius-sm);
   font-family: var(--font-family);
   font-size: var(--font-size-sm);
   font-weight: 700;
   line-height: 1;
   cursor: pointer;
   transition:
      background-color 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease,
      box-shadow 0.15s ease,
      opacity 0.15s ease;
}

:deep(.pagination__button:hover:not(.pagination__button--active):not(.pagination__button--disabled)) {
   color: var(--color-primary-hover);
   background: var(--color-success-bg);
   border-color: var(--color-primary-light);
}

:deep(.pagination__button--active) {
   color: var(--color-text-white);
   background: var(--color-primary);
   border-color: var(--color-primary);
   box-shadow: var(--shadow-sm);
}

:deep(.pagination__button--disabled) {
   color: var(--color-text-muted);
   cursor: not-allowed;
   opacity: 0.45;
}

:deep(.pagination__nav) {
   min-width: 124px;
   color: var(--color-primary-hover);
}

:deep(.pagination__nav--prev) {
   color: var(--color-text-secondary);
   border-right: 1px solid var(--color-border-light);
   border-radius: 0;
}

:deep(.pagination__nav--next) {
   border-left: 1px solid var(--color-border-light);
   border-radius: 0;
}

:deep(.pagination__nav-content) {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   gap: var(--space-2);
   min-width: 0;
}

:deep(.pagination__nav-content svg) {
   color: currentColor;
}

.pagination__mobile-button {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 40px;
   height: 32px;
   color: var(--color-text-secondary);
   background: transparent;
   border: 0;
   border-radius: var(--radius-sm);
   cursor: pointer;
   transition:
      background-color 0.15s ease,
      color 0.15s ease,
      opacity 0.15s ease;

   &:hover:not(:disabled) {
      color: var(--color-primary-hover);
      background: var(--color-success-bg);
   }

   &:disabled {
      color: var(--color-text-muted);
      cursor: not-allowed;
      opacity: 0.45;
   }
}

.pagination__mobile-button--next {
   color: var(--color-primary-hover);
}

.pagination__mobile-current {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   gap: var(--space-1);
   color: var(--color-text-secondary);
   font-size: var(--font-size-sm);
   font-weight: 700;
   line-height: 1;
}

.pagination__mobile-current strong {
   color: var(--color-primary-hover);
   font-weight: 800;
}
</style>
