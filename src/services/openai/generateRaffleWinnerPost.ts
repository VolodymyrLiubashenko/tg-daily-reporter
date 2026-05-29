import { OpenAI } from "openai";
import { env } from "../../config/env";

const client = new OpenAI({
   apiKey: env.openaiApiKey,
});

const LEADERBOARD_INTRO_UK =
   "Ось усі попередні переможці розіграшу та кількість перемог кожного:";

const LEADERBOARD_CLOSING_UK = "Не знаєш, як тут перемогти? Запитай у них — вони вже у справі.";

type TInput = {
   winner: {
      telegramUserId: string;
      messageCount: number;
      username: string | null;
      firstName: string | null;
      lastName: string | null;
   };
   prizeBeerName: string;
   /** Рядки списку переможців (label + wins) — згенеровані в коді, додаються до поста дослівно */
   leaderboardPlaintext: string;
};

export async function generateRaffleWinnerPost(input: TInput) {
   const { winner, prizeBeerName, leaderboardPlaintext } = input;

   const prompt = `
Ти створюєш короткий початок Telegram-поста українською мовою (лише верхня частина, без списків переможців і без фінального рядка після рейтингу — його додамо окремо).

ДАНІ ПЕРЕМОЖЦЯ:
username: ${winner.username ?? "-"}
ім’я: ${winner.firstName ?? ""} ${winner.lastName ?? ""}

ПРИЗ (ПИВО З КРАНУ):
назва: ${prizeBeerName}

ЗАВДАННЯ:
- 2–4 короткі рядки, живо й без шаблонності
- Уникай граматичних помилок і неприродних конструкцій
- НЕ використовуй слова, прив’язані до моменту часу: "сьогодні", "зараз", "цього разу" і т.д.
- Обов’язково згадай, що це розіграш від "Барного Оракула"
- Привітай переможця 🎉
- Вкажи, що переможець отримує бокал саме цього сорту пива — назву візьми з блоку «ПРИЗ» дослівно 🍺
- Подякуй всім учасникам за активність протягом тижня
- Заверши саме фразою "Нехай смакує 🍺" (останнім рядком цієї частини)

ВІДОБРАЖЕННЯ ПЕРЕМОЖЦЯ:
- Якщо є username → використовуй @username
- Якщо username немає → використовуй "Ім’я Прізвище"
- Якщо є тільки частина імені → використовуй те, що є

ПРАВИЛА:
- Не вигадуй дані
- Назву пива з блоку «ПРИЗ» використай без змін: не перекладай, не скорочуй і не замінюй іншим сортом
- Не змінюй і не перефразовуй фразу "Нехай смакує 🍺"
- Не пиши пояснень
- Не додавай списки, нумерацію переможців і не додавай фінальний заклик після списку — тільки цей короткий блок

ПОВЕРНИ ТІЛЬКИ ТЕКСТ ЦІЄЇ ВЕРХНЬОЇ ЧАСТИНИ.
`;

   const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
   });

   const opening = (response.output_text ?? "").trim();

   if (!leaderboardPlaintext.trim()) {
      return opening;
   }

   return `${opening}\n\n${LEADERBOARD_INTRO_UK}\n\n${leaderboardPlaintext}\n\n${LEADERBOARD_CLOSING_UK}`;
}
