import OpenAI from "openai";
import { env } from "../../config/env";
import { TTapBeer } from "../beer/getTapBeerList";

const client = new OpenAI({
   apiKey: env.openaiApiKey,
});

type TInput = {
   opponent: string;
   matchDate: string;
   competition: string;
   venue: "home" | "away";
   usdRate: number;
   rateDate: string;
   f1RaceName: string;
   f1RaceDate: string;
   f1RaceLocation: string;
   previousPosts?: string[];
   beers: TTapBeer[];
};

export async function generateMorningPost(input: TInput) {
   if (!env.openaiApiKey) {
      throw new Error("OPENAI_API_KEY is not set");
   }

   const { opponent, matchDate, competition, venue, usdRate, rateDate, f1RaceName, f1RaceDate, f1RaceLocation, previousPosts = [], beers = [] } = input;

   const prompt = `
Ти створюєш щоденний ранковий Telegram-пост українською мовою.

Пиши як короткий, живий ранковий дайджест для чату — легко, природно і без офіційності.

ПРАВИЛА:
- Використовуй тільки українську мову
- 5–10 коротких рядків основного тексту
- 1–5 емодзі максимум
- Без вигаданих фактів
- Не змінюй цифри, дати, назви команд, турнірів і валют
- Використовуй тільки надані дані
- Не повторюй стиль, вступ або структуру попередніх постів
- Іноді починай з футболу, іноді з курсу, іноді з короткої ранкової фрази
- Уникай канцеляризмів і “роботського” стилю
- Пиши так, ніби це написала жива людина
- Не використовуй однакові початкові фрази кілька днів поспіль
- Уникай повторення однакових слів у першому рядку
- Текст має бути одразу готовий для Telegram

Курс:
- Не пиши слово курс і дата не потрібна

Футбол:
- У день матча напиши коротке побажання для фанатів Манчестер Юнайтед Можна використовувати слова з гімну Манчестер Юнайтед
 Слова гімну Манчестер Юнайтед:
Glory, glory Man United,
Glory, glory Man United,
Glory, glory Man United,
As the Reds go marching on, on, on!

ПИВО:
- Не пиши слово пиво і дата не потрібна
- Вибери пиво на основі даних про попередній пост
- Вибери одне пиво рандомно із списку і напиши коротке, рекламуюче пиво, речення

ЖАРТ:
- В кінці додай короткий легкий жарт або фразу для гарного настрою
- Тема пива в пріорітеті
- Не про футбол і не про валюту
- Можна щось життєве або навіть про пиво 🙂
- Окремим рядком після основного тексту
- Без пояснень і без підписів типу "жарт:"

ПОПЕРЕДНІ ПОСТИ:
${previousPosts.length ? previousPosts.map((p, i) => `${i + 1}. ${p}`).join("\n") : "Немає"}

ДАНІ:

⚽ Футбол:
- команда: Manchester United
- суперник: ${opponent}
- дата і час: ${matchDate}
- турнір: ${competition}
- ${venue === "home" ? "матч удома" : "матч на виїзді"}

🏎️ Формула 1:
- гонка: ${f1RaceName}
- дата: ${f1RaceDate}
- місце: ${f1RaceLocation}

💵 Курс валют:
- 1 USD = ${usdRate} грн
- дата: ${rateDate}

🍺 Пиво на кранах:
${beers.length ? beers.map((beer, index) => `${index + 1}. ${beer.name}`).join("\n") : "Немає"}

ЗАВДАННЯ:
Створи короткий, природний і приємний ранковий пост українською мовою.

Поверни тільки текст поста без будь-яких пояснень.
`;

   const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
   });

   return response.output_text;
}
