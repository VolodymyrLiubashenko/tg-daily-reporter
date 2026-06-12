<script setup lang="ts">
import Main from "@components/Layout/Main/Main.vue";
import Header from "@components/Layout/Header/Header.vue";
import Footer from "@components/Layout/Footer/Footer.vue";
</script>

<template>
   <Header />
   <Main>
      <article class="about">
         <h1 class="about__title">Про бота TG Daily Reporter</h1>

         <p class="about__lead">
            <strong>TG Daily Reporter</strong> — це Telegram-бот для вашого чату. Він не відповідає на
            кожне повідомлення, а за розкладом публікує корисні та веселі пости: новини дня, спорт,
            пиво та результати розіграшів.
         </p>

         <section class="about__section">
            <h2 class="about__heading">Ранковий звіт</h2>
            <p>
               <strong>Щодня близько 10:05</strong> (за київським часом) бот надсилає в чат один
               великий пост. У ньому зазвичай є:
            </p>
            <ul class="about__list">
               <li>курс <strong>долара</strong> та <strong>євро</strong>;</li>
               <li>інформація про <strong>наступний матч Manchester United</strong>;</li>
               <li>інформація про <strong>наступний матч «Оболоні»</strong>;</li>
               <li>коли відбудеться <strong>наступна гонка Формули-1</strong>;</li>
               <li>що зараз є в <strong>розливному</strong>;</li>
               <li>
                  короткий текст «живою» мовою — бот підлаштовує стиль під ваш чат.
               </li>
            </ul>
         </section>

         <section class="about__section">
            <h2 class="about__heading">Пости про розливне</h2>
            <p>
               <strong>Середа, п’ятниця та субота близько 11:05</strong> бот нагадує про розливне
               пиво. У пості може з’явитися згадка тих, хто був активний у чаті протягом тижня.
            </p>
         </section>

         <section class="about__section">
            <h2 class="about__heading">Тижневий розіграш</h2>
            <p><strong>У п’ятницю близько 18:05</strong> бот підводить підсумки тижня:</p>
            <ul class="about__list">
               <li>рахує, хто писав у чаті;</li>
               <li>випадковим чином обирає <strong>переможця</strong>;</li>
               <li>публікує результат прямо в чаті.</li>
            </ul>
         </section>

         <section class="about__section">
            <h2 class="about__heading">Як бот «пам’ятає» активність</h2>
            <p>
               Щоб вести розіграш і згадувати активних учасників, бот
               <strong>запам’ятовує повідомлення</strong> людей у чаті. Це потрібно лише для обліку
               активності — бот не читає приватні переписки і не відповідає на кожне ваше слово.
            </p>
         </section>

         <section class="about__section">
            <h2 class="about__heading">Розклад (за київським часом)</h2>
            <table class="about__schedule">
               <thead>
                  <tr>
                     <th scope="col">Що</th>
                     <th scope="col">Коли</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>Ранковий звіт</td>
                     <td>Щодня, ~10:05</td>
                  </tr>
                  <tr>
                     <td>Пост про розливне</td>
                     <td>Середа, п’ятниця, субота, ~11:05</td>
                  </tr>
                  <tr>
                     <td>Тижневий розіграш</td>
                     <td>П’ятниця, ~18:05</td>
                  </tr>
               </tbody>
            </table>
            <p class="about__note">
               Час може трохи змінюватися через затримку сервера — пост з’явиться протягом
               хвилини-двох після запланованого моменту.
            </p>
         </section>
      </article>

      <Footer />
   </Main>
</template>

<style scoped lang="scss">
.about {
   max-width: 42rem;
   margin: 0 auto;
   padding: var(--space-5) var(--space-4);
}

.about__title {
   font-size: var(--font-size-xl);
   font-weight: 700;
   color: var(--color-text-primary);
   margin-bottom: var(--space-4);
}

.about__lead {
   font-size: var(--font-size-md);
   line-height: 1.6;
   color: var(--color-text-primary);
   margin-bottom: var(--space-6);
}

.about__section {
   margin-bottom: var(--space-6);

   p {
      font-size: var(--font-size-md);
      line-height: 1.6;
      color: var(--color-text-primary);
      margin-bottom: var(--space-3);
   }
}

.about__heading {
   font-size: var(--font-size-lg);
   font-weight: 600;
   color: var(--color-text-primary);
   margin-bottom: var(--space-3);
}

.about__list {
   padding-left: var(--space-5);
   display: flex;
   flex-direction: column;
   gap: var(--space-2);

   li {
      font-size: var(--font-size-md);
      line-height: 1.6;
      color: var(--color-text-primary);
   }
}

.about__schedule {
   width: 100%;
   border-collapse: collapse;
   margin-bottom: var(--space-3);
   font-size: var(--font-size-sm);

   th,
   td {
      padding: var(--space-3) var(--space-4);
      text-align: left;
      border: 1px solid var(--color-border);
   }

   th {
      font-weight: 600;
      color: var(--color-text-primary);
      background-color: var(--color-surface-secondary);
   }

   td {
      color: var(--color-text-primary);
   }
}

.about__note {
   font-size: var(--font-size-sm);
   color: var(--color-text-secondary);
   margin-bottom: 0;
}
</style>
