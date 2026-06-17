<script setup lang="ts">
import Footer from "@components/Layout/Footer/Footer.vue";
import Header from "@components/Layout/Header/Header.vue";
import Main from "@components/Layout/Main/Main.vue";
</script>

<template>
   <Header />
   <Main>
      <section class="admin">
         <div class="admin__panel">
            <p class="admin__eyebrow">Закрита зона</p>
            <h1 class="admin__title">Адмін-панель</h1>
            <p class="admin__lead">
               Доступ до цієї сторінки має тільки власник застосунку. Майбутні адмін-інструменти
               з'являться тут.
            </p>
         </div>

         <div class="admin__placeholder">
            <h2 class="admin__placeholder-title">Місце для інструментів</h2>
            <p>
               Тут можна буде додати керування постами, перегляд даних або ручні дії для бота.
            </p>
         </div>
      </section>

      <Footer />
   </Main>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.admin {
   width: 100%;
   max-width: 960px;
   margin: 0 auto;
   padding: var(--space-6) var(--space-5);

   @include mq-mobile {
      padding: var(--space-5) var(--space-4);
   }
}

.admin__panel,
.admin__placeholder {
   background: var(--color-surface);
   border: 1px solid var(--color-border-light);
   border-radius: var(--radius-md);
   box-shadow: var(--shadow-md);
}

.admin__panel {
   padding: var(--space-7);

   @include mq-mobile {
      padding: var(--space-5);
   }
}

.admin__eyebrow {
   margin: 0 0 var(--space-2);
   color: var(--color-primary-hover);
   font-size: var(--font-size-sm);
   font-weight: 700;
   text-transform: uppercase;
}

.admin__title {
   margin: 0 0 var(--space-4);
   color: var(--color-text-primary);
   font-size: var(--font-size-xl);
   font-weight: 700;
}

.admin__lead {
   max-width: 680px;
   margin: 0;
   color: var(--color-text-secondary);
   font-size: var(--font-size-md);
   line-height: 1.6;
}

.admin__placeholder {
   margin-top: var(--space-5);
   padding: var(--space-5);
   background: var(--color-success-bg);

   p {
      margin: 0;
      color: var(--color-text-secondary);
      font-size: var(--font-size-md);
      line-height: 1.6;
   }
}

.admin__placeholder-title {
   margin: 0 0 var(--space-3);
   color: var(--color-text-primary);
   font-size: var(--font-size-lg);
   font-weight: 700;
}
</style>
