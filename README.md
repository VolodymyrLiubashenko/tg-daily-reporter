# tg-daily-reporter

Сервер на Express для ранкових звітів у Telegram, обліку активності в чаті та допоміжних ендпоінтів.

## Базовий шлях API

Усі роути підключені під префіксом **`/api`**.

Повна адреса: `http://<хост>:<порт>/api/...`

Порт задається змінною середовища `PORT` (за замовчуванням **3000**).

---

## Перелік роутів

### Перевірка стану сервера

| Метод | Шлях | Опис |
|--------|------|------|
| `GET` | `/api/health` | Перевірка, що сервер запущений. Відповідь: `{ ok: true, message: "Server is running" }`. |

---

### Telegram

| Метод | Шлях | Опис |
|--------|------|------|
| `GET` | `/api/telegram/test` | Тестове відправлення повідомлення в Telegram (текст на кшталт підтвердження з’єднання). Потрібні налаштовані `TELEGRAM_BOT_TOKEN` та цільовий чат. |
| `POST` | `/api/telegram/admin/send-message` | Відправляє довільний текст у `TELEGRAM_CHAT_ID` від імені бота. Потрібна Google-сесія користувача, email якого є в backend env `ADMIN_EMAILS`. Тіло: `{ "text": "..." }`. |
| `POST` | `/api/telegram/admin/edit-message` | Редагує написаний адміном текст через OpenAI і повертає `editedText`, але не відправляє його в Telegram. Потрібна Google-сесія та email у `ADMIN_EMAILS`. Тіло: `{ "text": "..." }`. |
| `POST` | `/api/telegram/webhook` | Вебхук для оновлень від Telegram Bot API. Тіло — JSON оновлення (`update`). Якщо є `message` з `chat.id`, `from.id` та `message_id`, повідомлення зберігається для обліку активності. Відповідь: `{ ok: true }`. |

**Заголовки для `POST /webhook`:** `Content-Type: application/json`.

---

### Звіти та ранковий пост

| Метод | Шлях | Опис |
|--------|------|------|
| `GET` | `/api/reports/morning-preview` | Збирає дані для ранкового звіту (матч, валюта, F1 тощо) і повертає їх у JSON без звернення до OpenAI. |
| `GET` | `/api/reports/morning-text-preview` | Те саме, що preview даних, плюс генерує текст поста через OpenAI з урахуванням останніх повідомлень бота в чаті. Потрібні `OPENAI_API_KEY`, `TELEGRAM_CHAT_ID` (для історії повідомлень). |
| `POST` | `/api/reports/send-morning-test` | Відправляє ранковий звіт у Telegram. Потрібен заголовок **`x-cron-secret`** = `SEND_REPORT_SECRET`. Після відправлення текст зберігається в обліку повідомлень бота. |

---

### Активність у чаті

| Метод | Шлях | Опис |
|--------|------|------|
| `GET` | `/api/activity/active-users` | Список активних користувачів за **останні 7 днів** у вказаному чаті. |
| `GET` | `/api/activity/users` | Список усіх збережених користувачів чату, відсортований за останньою активністю. |

**Query-параметри:**

- `chatId` (необов’язково) — ID чату Telegram. Якщо не вказано, використовується `TELEGRAM_CHAT_ID` з оточення.

**Приклад:** `GET /api/activity/active-users?chatId=-1001234567890`

**Приклад:** `GET /api/activity/users?chatId=-1001234567890`

**Відповідь (скорочено):** `ok`, `chatId`, `startDate`, `endDate`, `count`, `users`.

---

### Розіграш (тижневий переможець)

| Метод | Шлях | Опис |
|--------|------|------|
| `GET` | `/api/raffle/pick-weekly-winner` | Обирає переможця серед активних за **останні 7 днів** у чаті (логіка в сервісі `pickWeeklyWinner`). |

**Тіло запиту (JSON, необов’язково):**

- `chatId` — перевизначити чат. Якщо не передано, використовується `TELEGRAM_CHAT_ID` з оточення.

> Примітка: для методу `GET` передача `chatId` у JSON-тілі нестандартна; багато клієнтів її не надсилають. Якщо потрібен лише чат з `.env`, викликайте ендпоінт без тіла.

**Відповідь:** `ok`, `chatId`, `startDate`, `endDate`, `winner`.

---

## Загальні зауваження

1. **404:** Невідомі шляхи повертають `{ ok: false, message: "Route not found" }`.
2. **MongoDB:** Для вебхука, активності, розіграшу та відстеження повідомлень потрібне підключення до MongoDB (`MONGODB_URI`, `MONGODB_DB_NAME` за потреби).
3. **Запуск:** `npm run dev` (розробка) або `npm run build` і `npm start` (продакшен).
4. **Розклад на Render Free:** серверний cron не працює під час sleep; автозапуск — [cron-job.org](docs/external-cron.md) (POST на API з `x-cron-secret`). GitHub Actions — лише ручний запуск.
5. **Фронтенд (Vue):** каталог [frontApp/](frontApp/) — окремий `npm install` / `npm run dev` (порт 5173); бекенд має бути запущений на порту з `PORT` (за замовчуванням 3000). Деталі в [frontApp/README.md](frontApp/README.md). від зовнішніх API (футбол, курси, F1, OpenAI), перевірте відповідні токени та ключі в `.env`.

## Frontend theme

`frontApp` uses CSS custom properties from `frontApp/src/styles/variables.scss` for light and dark theme colors. Dark mode is applied automatically with `prefers-color-scheme: dark` until the user chooses a theme. Manual selection is stored in `localStorage` and applied through `data-theme="light|dark"` on the `html` element.

For frontend visual changes, use existing theme tokens first. If a new color or shadow is needed, add a semantic token in `variables.scss` with both light and dark values instead of hardcoding colors inside Vue component styles.

## Admin Telegram tools

The admin page in `frontApp` includes a Telegram bot message tool:

- `POST /api/telegram/admin/send-message` sends the admin text to `TELEGRAM_CHAT_ID` through the bot with the existing Telegram HTML parse mode.
- `POST /api/telegram/admin/edit-message` sends the current admin text to OpenAI for light editing and returns `editedText`; it does not send anything to Telegram.
- Both endpoints require a Google session and backend allowlist membership through `ADMIN_EMAILS`.
- Admin-sent messages and AI drafts are not saved to `BotMessage`.
- The frontend keeps the AI result as a separate draft. The admin can apply it, cancel it with the close icon, or send the original text after cancelling the draft.

Required backend env is documented in `.env.example`; required frontend env is documented in `frontApp/.env.example`.

## Frontend request pattern

All frontend API calls, including mutations, go through typed API modules plus TanStack Vue Query composables. Components should use hooks such as `useSendMessageByAdmin` or `useEditMessageByAdmin` instead of calling axios/API methods directly.

`frontApp` keeps `zod` on v3 because `@vee-validate/zod@4.15.1` declares the peer range `zod@^3.24.0`. Upgrading `zod` to v4 requires upgrading or replacing the vee-validate adapter first.
