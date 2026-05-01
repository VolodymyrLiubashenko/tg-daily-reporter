import { OpenAI } from "openai";
import { env } from "../../config/env";

const client = new OpenAI({
   apiKey: env.openaiApiKey,
});

type TInput = {
   winner: {
      telegramUserId: string;
      messageCount: number;
      username: string | null;
      firstName: string | null;
      lastName: string | null;
   };
   prizeBeerName: string;
};

export async function generateRaffleWinnerPost(input: TInput) {
   const { winner, prizeBeerName } = input;

   const prompt = `
Ти створюєш Telegram-пост українською мовою.

ДАНІ ПЕРЕМОЖЦЯ:
username: ${winner.username ?? "-"}
ім’я: ${winner.firstName ?? ""} ${winner.lastName ?? ""}

ПРИЗ (ПИВО З КРАНУ):
назва: ${prizeBeerName}

ЗАВДАННЯ:
- Напиши короткий, живий, природний пост без шаблонності
- Уникай граматичних помилок і неприродних конструкцій
- НЕ використовуй слова, прив’язані до моменту часу: "сьогодні", "зараз", "цього разу" і т.д.
- Обов’язково згадай, що це розіграш від "Барного Оракула"
- Привітай переможця 🎉
- Вкажи, що переможець отримує бокал саме цього сорту пива — назву візьми з блоку «ПРИЗ» дослівно 🍺
- Подякуй всім учасникам за активність протягом тижня
- Використай ФІКСОВАНУ фінальну фразу: "Нехай смакує 🍺"

ВІДОБРАЖЕННЯ ПЕРЕМОЖЦЯ:
- Якщо є username → використовуй @username
- Якщо username немає → використовуй "Ім’я Прізвище"
- Якщо є тільки частина імені → використовуй те, що є

ПРАВИЛА:
- Не вигадуй дані
- Назву пива з блоку «ПРИЗ» використай без змін: не перекладай, не скорочуй і не замінюй іншим сортом
- Не змінюй і не перефразовуй фразу "Нехай смакує 🍺"
- Не пиши пояснень
- Не роби довгий текст (2–4 рядки максимум)
- Текст має звучати як від живої людини

ПОВЕРНИ ТІЛЬКИ ТЕКСТ ПОСТА.
`;

   const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
   });

   return response.output_text;
}
