# Внешний cron (cron-job.org)

На **Render Free** процесс засыпает — `ENABLE_CRON` на сервере не срабатывает.  
**GitHub Actions `schedule`** ставит job в очередь с задержкой на часы.

Рекомендуется: **[cron-job.org](https://cron-job.org)** (бесплатный тариф) → HTTP POST на Render, сервис просыпается и выполняет задачу.

Расписание в **Europe/Kyiv**. В GitHub Actions оставлен только ручной запуск (`workflow_dispatch`).

---

## Секрет и URL

На Render в Environment:

| Переменная | Назначение |
|------------|------------|
| `SEND_REPORT_SECRET` | Значение заголовка `x-cron-secret` |

Базовый хост: `https://<ваш-сервис>.onrender.com`

| Задача | Метод | URL |
|--------|-------|-----|
| Утренний отчёт | `POST` | `https://<host>/api/reports/send-morning-test` |
| Пост про разливное | `POST` | `https://<host>/api/draw-beer/send-post` |
| Результат розыгрыша | `POST` | `https://<host>/api/raffle/send-raffle-result` |

Во всех job на cron-job.org:

- **Request method:** POST  
- **Custom header:** `x-cron-secret` = значение `SEND_REPORT_SECRET` (без пробелов в начале/конце)  
- **Timezone:** Europe/Kyiv  

Тест вручную:

```bash
curl -f -X POST \
  -H "x-cron-secret: YOUR_SECRET" \
  "https://<host>/api/reports/send-morning-test"
```

Учтите **cold start** Render (~30–90 с): пост может уйти на 1–2 минуты позже времени cron.

---

## Три job на cron-job.org

### 1. Утренний отчёт

- **Title:** Morning report  
- **Schedule:** Every day at **10:05**  
- **Timezone:** Europe/Kyiv  
- **URL:** `.../api/reports/send-morning-test`

### 2. Разливное пиво

- **Title:** Draw beer post  
- **Schedule:** **11:05**, дни недели **Ср, Пт, Сб**  
- **Timezone:** Europe/Kyiv  
- **URL:** `.../api/draw-beer/send-post`

### 3. Розыгрыш

- **Title:** Raffle result  
- **Schedule:** **Пятница 18:05**  
- **Timezone:** Europe/Kyiv  
- **URL:** `.../api/raffle/send-raffle-result`

---

## GitHub Actions

Workflow в `.github/workflows/` без `schedule` — только ручной запуск из вкладки Actions, если нужен резервный вызов без cron-job.org.

**Не включайте одновременно** `schedule` в GitHub и cron-job.org на те же задачи — будет двойная отправка в Telegram.

---

## Регистрация на cron-job.org (кратко)

1. Аккаунт на [cron-job.org](https://console.cron-job.org).  
2. **Cronjobs → Create cronjob**.  
3. URL, POST, заголовок `x-cron-secret`, timezone Kyiv, расписание из таблицы выше.  
4. **Test run** — проверить 200 и пост в чате.  
5. Повторить для трёх задач.
