# styles

Глобальні та спільні стилі. Порядок у `main.ts`: **`reset.css`** (скидання) → шрифти → **`main.css`** (тема з `theme.scss` + типографіка `body`). Додаткові файли — `@import` у `main.css` або `import "@styles/..."` у TS/Vue.

## Міксини (`mixins/mediaQuery.scss`)

Медіа збігаються з **`src/composables/useMediaQuery.ts`** (`BREAKPOINTS`). Після зміни порогів оновіть обидва файли.

У Vue `<style scoped lang="scss">`:

```scss
@use "@/styles/mixins/mediaQuery.scss" as mq;

.block {
   padding: var(--space-6);

   @include mq.mq-mobile {
      padding: var(--space-3);
   }

   @include mq.mq-wide {
      max-width: var(--container-width);
   }
}
```

Доступні міксини: `mq-mobile`, `mq-tablet`, `mq-laptop`, `mq-desktop`, `mq-wide`, а також `mq-raw("(min-width: 900px)")` для довільного рядка.
