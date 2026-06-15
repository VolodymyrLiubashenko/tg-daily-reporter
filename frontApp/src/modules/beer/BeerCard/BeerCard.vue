<script setup lang="ts">
import Icon from "@components/Icon/Icon.vue";
import type { IFullBeerInfo } from "@/declarations/beer";
import { computed } from "vue";

type Props = {
   beer: IFullBeerInfo;
};

const props = defineProps<Props>();

const priceLabel = computed(() => {
   if (!props.beer.prices.length) {
      return "Ціни уточнюються";
   }

   return props.beer.prices.map(({ volume, price }) => `${volume} — ${price}`).join(" · ");
});

const compactPriceLabel = computed(() => {
   if (!props.beer.prices.length) {
      return priceLabel.value;
   }

   return props.beer.prices
      .map(({ volume, price }) => `${volume} - ${price.replace(/,00(?=\s*₴)/, "")}`)
      .join(" / ");
});
</script>

<template>
   <article class="beer-card">
      <div class="beer-card__image-wrap">
         <img class="beer-card__image" :src="beer.imageUrl" :alt="beer.name" loading="lazy" />
      </div>

      <div class="beer-card__content">
         <span class="beer-card__tap">Кран {{ beer.tapNumber }}</span>

         <div class="beer-card__heading">
            <h3 class="beer-card__title">{{ beer.name }}</h3>
            <p class="beer-card__brewery">
               <Icon name="beer" :size="14" />
               <span>{{ beer.brewery }}</span>
            </p>
         </div>

         <p class="beer-card__style">{{ beer.style }}</p>

         <dl class="beer-card__stats">
            <div class="beer-card__stat">
               <dt>{{ beer.abv }}</dt>
               <dd>ABV</dd>
            </div>
            <div class="beer-card__stat">
               <dt>{{ beer.ibu }}</dt>
               <dd>IBU</dd>
            </div>
         </dl>

         <p class="beer-card__prices">
            <Icon name="tag" :size="14" />
            <span class="beer-card__prices-label">Ціни:</span>
            <span class="beer-card__prices-value beer-card__prices-value--desktop">{{ priceLabel }}</span>
            <span class="beer-card__prices-value beer-card__prices-value--mobile">{{ compactPriceLabel }}</span>
         </p>

         <a
            v-if="beer.untappdUrl"
            class="beer-card__link"
            :href="beer.untappdUrl"
            target="_blank"
            rel="noreferrer"
         >
            <span>Детальніше на Untappd</span>
            <Icon name="externalLink" :size="14" />
         </a>
      </div>
   </article>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.beer-card {
   display: grid;
   grid-template-columns: 104px 1fr;
   gap: var(--space-4);
   width: 100%;
   padding: var(--space-3);
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-md);

   @include mq-mobile {
      grid-template-columns: 88px 1fr;
      gap: var(--space-3);
      padding: var(--space-2);
   }
}

.beer-card__image-wrap {
   display: flex;
   align-items: center;
   justify-content: center;
   min-height: 156px;
   background: var(--color-surface-secondary);
   border-radius: var(--radius-sm);
   overflow: hidden;
}

.beer-card__image {
   display: block;
   width: 100%;
   height: 100%;
   object-fit: cover;
}

.beer-card__content {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   gap: var(--space-2);
   min-width: 0;
}

.beer-card__tap {
   display: inline-flex;
   padding: var(--space-1) var(--space-2);
   color: var(--color-primary-hover);
   background: var(--color-success-bg);
   border: 1px solid var(--color-primary-light);
   border-radius: var(--radius-sm);
   font-size: var(--font-size-xs);
   font-weight: 600;
   line-height: 1;
}

.beer-card__heading {
   display: flex;
   flex-direction: column;
   gap: var(--space-1);
   width: 100%;
}

.beer-card__title {
   margin: 0;
   color: var(--color-text-primary);
   font-size: var(--font-size-lg);
   font-weight: 700;
   line-height: 1.2;
}

.beer-card__brewery {
   display: inline-flex;
   align-items: center;
   gap: var(--space-1);
   margin: 0;
   color: var(--color-primary-hover);
   font-size: var(--font-size-sm);
   font-weight: 600;
   line-height: 1.2;
}

.beer-card__style {
   width: 100%;
   margin: 0;
   padding-top: var(--space-2);
   color: var(--color-text-secondary);
   border-top: 1px solid var(--color-border-light);
   font-size: var(--font-size-sm);
   line-height: 1.35;
}

.beer-card__stats {
   display: flex;
   gap: var(--space-7);
   margin: 0;
}

.beer-card__stat {
   display: flex;
   flex-direction: column;
   gap: var(--space-1);
}

.beer-card__stat dt,
.beer-card__stat dd {
   margin: 0;
}

.beer-card__stat dt {
   color: var(--color-text-primary);
   font-size: var(--font-size-sm);
   font-weight: 700;
   line-height: 1;
}

.beer-card__stat dd {
   color: var(--color-text-muted);
   font-size: var(--font-size-xs);
   font-weight: 600;
   line-height: 1;
   text-transform: uppercase;
}

.beer-card__prices {
   display: inline-flex;
   align-items: center;
   gap: var(--space-1);
   width: 100%;
   margin: 0;
   padding: var(--space-2);
   color: var(--color-text-primary);
   background: var(--color-surface-secondary);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-sm);
   font-size: var(--font-size-sm);
   font-weight: 500;
   line-height: 1.35;

   @include mq-raw("(max-width: 1280px)") {
      gap: 3px;
      padding: 6px;
      font-size: var(--font-size-xs);
      line-height: 1.2;
      white-space: nowrap;
   }
}

.beer-card__prices :deep(svg) {
   flex-shrink: 0;
}

.beer-card__prices-label {
   flex-shrink: 0;
}

.beer-card__prices-value {
   min-width: 0;
}

.beer-card__prices-value--mobile {
   display: none;

   @include mq-raw("(max-width: 1280px)") {
      display: inline;
   }
}

.beer-card__prices-value--desktop {
   @include mq-raw("(max-width: 1280px)") {
      display: none;
   }
}

.beer-card__link {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
   color: var(--color-primary-hover);
   font-size: var(--font-size-sm);
   font-weight: 600;
   line-height: 1.2;
   text-decoration: none;

   &:hover {
      color: var(--color-primary);
   }
}
</style>
