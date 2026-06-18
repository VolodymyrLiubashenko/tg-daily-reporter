# Інструкція для AI-агента (Cursor)

## Що це за репозиторій

**tg-daily-reporter** — Express + TypeScript сервер для Telegram-чату: ранкові звіти (курси, спорт, F1, пиво, OpenAI), пости про розливне, тижневий розіграш, webhook для обліку повідомлень у MongoDB. Прод часто на **Render Free**; розклад викликів — **cron-job.org** (POST), не вбудований cron процесу.

## Обов’язково прочитай перед змінами

1. **[docs/project-guide.md](docs/project-guide.md)** — структура папок і файлів, всі маршрути `/api`, потоки даних, `env`, GitHub Actions.
2. **[docs/external-cron.md](docs/external-cron.md)** — URL, заголовки, час Europe/Kyiv для зовнішнього cron.
3. **[README.md](README.md)** — коротка таблиця API для людей.

## Правила роботи в коді

- Шари: **routes** (тонкі) → **controllers** (HTTP, секрети) → **services** (логіка, зовнішні API).
- Не хардкодити секрети, токени, URI продакшену; використовувати `src/config/env.ts` і змінні середовища.
- Для cron-ендпоінтів: заголовок **`x-cron-secret`**, значення з **`SEND_REPORT_SECRET`** — як у наявних `sendMorningController`, `sendDrawBeerPostController`, `sendRaffleResultController`.
- Бізнес-час і тексти для чату — **Europe/Kyiv** та українська мова в промптах (`src/services/openai/`).
- Мінімальний diff: не рефакторити та не переформатовувати непов’язаний код без явного запиту.
- У репозиторії немає папки `tests/`; нові тести — лише якщо домовились або користувач попросив.
- Фронтенд — окремий пакет у **`frontApp/`** (Vue 3 + Vite); бекенд залишається в `src/`. У `frontApp`: `npm run lint`, `npm run format`.

## Команди

```bash
npm run dev        # розробка
npm run build      # збірка → dist/
npm start          # прод після build
npm run typecheck  # перевірка типів без збірки
```

## Швидка шпаргалка маршрутів

Префікс усіх API: **`/api`**. Критичні POST для проду: `/reports/send-morning-test`, `/draw-beer/send-post`, `/raffle/send-raffle-result` (усі з `x-cron-secret`). Деталі — у `docs/project-guide.md`.

# Frontend Agent Guide

## Что это за часть проекта

`frontApp/` — отдельный фронтенд-пакет в монорепозитории `tg-daily-reporter`.
Стек: **Vue 3 + Vite + TypeScript + SCSS**. Фронт обращается к backend Express через `/api/...`.

Перед изменениями во фронте полезно прочитать:

- `frontApp/README.md` — запуск, алиасы, сборка, линт/форматирование.
- `frontApp/vite.config.ts` — Vite, алиасы, dev proxy.
- `frontApp/tsconfig.app.json` — TypeScript strict-настройки и alias paths.

## Запуск и проверки

Backend запускается из корня репозитория:

```bash
npm run dev
```

Frontend запускается из `frontApp/`:

```bash
cd frontApp
npm run dev
```

Vite работает на `http://localhost:5173`, запросы `/api/*` проксируются на `http://127.0.0.1:3000`.

Основные команды во фронте:

```bash
npm run build
npm run typecheck
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

## Структура фронтенда

- `frontApp/src/main.ts` — входная точка приложения: Vue, router, Vue Query, reset, шрифты, глобальные стили.
- `frontApp/src/App.vue` — корневая оболочка с `RouterView`.
- `frontApp/src/router/` — роутинг Vue Router. Пути вынесены в `paths.ts`.
- `frontApp/src/pages/` — страницы приложения: `Home`, `Beer`, `About`, `Raffle`.
- `frontApp/src/components/` — переиспользуемые компоненты: layout, button, icon, popup, cards.
- `frontApp/src/modules/` — доменные UI-блоки, например спортивные карточки.
- `frontApp/src/api/` — API-клиент и доменные API-модули.
- `frontApp/src/composables/` — переиспользуемая Composition API логика.
- `frontApp/src/styles/` — глобальные стили, CSS variables, типографика, SCSS mixins.
- `frontApp/public/images/` — статические изображения, доступные как `/images/...`.

## Роутинг

Роуты задаются в `src/router/index.ts`, а сами path helper-функции — в `src/router/paths.ts`.
При добавлении новой страницы:

1. Создать компонент страницы в `src/pages/<PageName>/<PageName>.vue`.
2. Добавить helper пути в `paths.ts`.
3. Подключить страницу в `router/index.ts`.
4. Если нужно, добавить ссылку в `components/Layout/Header`.

## API

Общий axios-клиент находится в `src/api/client.ts`.

Текущий паттерн:

- API методы лежат в `src/api/<domain>/<domain>Api.ts`.
- Типы ответов лежат рядом в `src/api/<domain>/<domain>ApiTypes.ts`.
- Базовый URL берется из `src/config.ts` (`VITE_API_URL`).
- Для запросов с кешированием используется `@tanstack/vue-query`.

При добавлении нового endpoint лучше не вызывать `axios` прямо из компонента.
Добавляйте метод в доменный API-модуль, типизируйте ответ и вызывайте его из composable или страницы.

## Стили

Глобальные стили подключены в `src/main.ts`:

- `@styles/reset.css`
- шрифты `@fontsource/inter`
- `@styles/main.css`

`main.css` импортирует:

- `variables.scss` — CSS variables: цвета, spacing, radius, typography.
- `typography.scss` — базовые стили заголовков и текста.

Theme rules:

- `frontApp/src/styles/variables.scss` is the source of truth for theme tokens.
- Light theme values live in `:root`; dark theme values are applied automatically with `@media (prefers-color-scheme: dark)` until the user chooses a theme.
- Manual theme selection is stored in `localStorage` and applied through `data-theme="light|dark"` on the `html` element.
- For visual changes, use existing `var(--color-...)`, `var(--shadow-...)`, `var(--space-...)`, and `var(--radius-...)` tokens first.
- If a new color/shadow is needed, add a semantic token to `variables.scss` with both light and dark values.
- Do not add component-local hex/rgb colors unless the color belongs to a fixed image, logo, or SVG brand asset.
- For color, card, overlay, badge, shadow, or border changes, verify both light and dark appearances.

В компонентах используется `<style scoped lang="scss">`.
Для responsive-стилей используйте `@styles/mixins/mediaQuery.scss`.

Важно: breakpoint-значения продублированы в `src/composables/useMediaQuery.ts`.
Если меняете breakpoint в SCSS, синхронизируйте composable.

## Компоненты

Предпочтения для изменений:

- Общие элементы интерфейса менять в `src/components/`.
- Страничные секции держать рядом со страницей, например `src/pages/Beer/Banner/BeerBanner.vue`.
- Иконки использовать через `components/Icon`, который оборачивает Lucide и custom SVG.
- Кнопки использовать через `components/Button`, не дублировать стили кнопок локально без причины.

## Как лучше вносить изменения

- Делать минимальный diff и не форматировать несвязанные файлы.
- Соблюдать Composition API и `<script setup lang="ts">`.
- Сохранять строгую типизацию: `tsconfig.app.json` включает `strict`, `noUnusedLocals`, `noUnusedParameters`.
- Для API-данных сначала описывать типы, затем метод API, затем UI/composable.
- Для визуальных правок использовать существующие CSS variables и SCSS mixins.
- Для темизации не хардкодить цвета в компонентах; добавлять semantic token в `frontApp/src/styles/variables.scss` и задавать значения для light/dark.
- Для новых изображений класть ассеты в `frontApp/public/images/`, если они должны открываться по публичному URL.
- После существенных изменений запускать минимум `npm run typecheck` и `npm run lint` в `frontApp/`.

## Краткий анализ `frontApp/README.md`

README актуально описывает базовый workflow фронта:

- фронт — отдельный пакет внутри монорепозитория;
- backend должен работать на порту `3000`;
- Vite dev server работает на `5173`;
- `/api/*` проксируется через `vite.config.ts`;
- aliases согласованы между `vite.config.ts` и `tsconfig.app.json`;
- build складывает артефакты в `frontApp/dist/`;
- для продакшена нужен один origin с API или отдельная CORS-настройка;
- перечислены стек, lint и format команды.

Чего README почти не раскрывает: внутреннюю структуру `src/`, паттерн API-модулей, Vue Query, расположение shared-компонентов, правила SCSS и синхронизацию breakpoint-ов. Эти детали зафиксированы в этом `AGENT.md`.
