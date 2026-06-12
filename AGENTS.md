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
