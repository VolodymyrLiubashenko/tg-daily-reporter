# frontApp — фронтенд (Vue 3 + Vite + TypeScript)

Окремий пакет у монорепозиторії; звертається до Express API з кореня проєкту (`/api/...`).

## Розробка

1. У корені репозиторію запустіть бекенд: `npm run dev` (порт **3000** за замовчуванням).
2. У цій папці:

```bash
cd frontApp
npm install
npm run dev
```

Vite відкриється на **http://localhost:5173**. Запити на `/api/*` проксуються на `http://127.0.0.1:3000` (див. `vite.config.ts`).

## Аліаси імпортів (`vite.config.ts` + `tsconfig.app.json`)

| Аліас          | Каталог           |
| -------------- | ----------------- |
| `@/`           | `src/`            |
| `@pages/`      | `src/pages/`      |
| `@router/`     | `src/router/`     |
| `@components/` | `src/components/` |
| `@styles/`     | `src/styles/`     |

Приклад: `import { x } from "@router/paths"`, `import Home from "@pages/Home/Home.vue"`, `import App from "@/App.vue"`, `import "@styles/main.css"`.

## Збірка

```bash
npm run build
```

Артефакти в `frontApp/dist/`. Для продакшену потрібно або:

- роздавати `dist` через той самий хост, що й API (один origin), або
- налаштувати **CORS** на Express для домену фронту та викликати API за повним URL.

## Стек

- Vue 3 (Composition API, `<script setup>`)
- Vite 6
- TypeScript
- ESLint 9 (flat config) + `eslint-plugin-vue` + `typescript-eslint`
- Prettier + `eslint-config-prettier` (без конфліктів правил)

## Лінт і форматування

```bash
npm run lint          # перевірка ESLint
npm run lint:fix      # ESLint з автофіксом
npm run format        # Prettier --write для всього проєкту
npm run format:check  # перевірка без змін
```

Конфіг ESLint: `eslint.config.js`. Prettier: `.prettierrc.json`, ігнори — `.prettierignore`.

## Theme and dark mode

The frontend uses CSS custom properties from `src/styles/variables.scss` as the single source of truth for colors, shadows, spacing, radii, and typography. Light theme values live in `:root`; dark theme values are applied automatically through `@media (prefers-color-scheme: dark)` until the user chooses a theme. Manual selection is stored in `localStorage` and applied through `data-theme="light|dark"` on the `html` element.

When changing UI styles:

- prefer existing `var(--color-...)`, `var(--shadow-...)`, `var(--space-...)`, and `var(--radius-...)` tokens;
- add a semantic token in `variables.scss` before introducing a new hardcoded color;
- keep both light and dark values for every new color/shadow token;
- avoid component-local hex/rgb colors except for fixed brand assets or image/SVG artwork;
- check the changed screen in both light and dark system themes when the change affects colors, cards, overlays, badges, shadows, or borders.

## API and TanStack Query

All frontend HTTP calls go through typed API modules and TanStack Vue Query composables:

1. Add request/response types in `src/api/<domain>/<domain>ApiTypes.ts`.
2. Add the axios method in `src/api/<domain>/<domain>Api.ts`.
3. Wrap the method with `useQuery` or `useMutation` in a composable.
4. Use the composable from Vue components; do not call API methods directly from components.

Admin Telegram API files live in `src/api/telegram/`. The admin send/edit page uses local mutation composables in `src/pages/Admin/SendMessage/composables/`.

## Admin message UI

`src/pages/Admin/SendMessage/AdminSendMessage.vue` lets an allowlisted admin:

- write a Telegram message with `FormTextArea`;
- ask AI to lightly edit the current text;
- review the AI result as a separate draft;
- apply the draft or cancel it with the close icon;
- send the final textarea text to Telegram.

On desktop the AI draft is shown beside the textarea; on mobile it appears below it. If a textarea validation error exists, the send button is disabled. If an AI draft exists, both send and AI edit buttons stay disabled until the admin applies or cancels the draft.

## Env example

Frontend env keys are documented in `frontApp/.env.example`. The Vite dev server still proxies `/api/*` to the backend, so local admin tools require the backend to run on port `3000`.

## Dependency note

`@vee-validate/zod@4.15.1` requires peer `zod@^3.24.0`. Keep frontend `zod` on v3 until that adapter is upgraded or replaced; `zod@4` breaks clean installs on Vercel with `ERESOLVE`.
