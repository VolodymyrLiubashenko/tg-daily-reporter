# styles

Глобальні та спільні стилі. Порядок у `main.ts`: **`reset.css`** (скидання) → шрифти → **`main.css`** (`variables.scss` + типографіка `body`). Додаткові файли — `@import` у `main.css` або `import "@styles/..."` у TS/Vue.

## Theme tokens

`variables.scss` is the source of truth for UI tokens. Light theme values live in `:root`; dark theme values are applied automatically through `@media (prefers-color-scheme: dark)` until the user chooses a theme. Manual selection is stored in `localStorage` and applied through `data-theme="light|dark"` on the `html` element.

Use semantic CSS variables in components instead of hardcoded colors. If a new visual color is needed, add a token with both light and dark values before using it in component styles.

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
