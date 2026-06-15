<script setup lang="ts">
import Header from "@components/Layout/Header/Header.vue";
import Main from "@components/Layout/Main/Main.vue";
import Footer from "@components/Layout/Footer/Footer.vue";
import RaffleBanner from "./Banner/RaffleBanner.vue";
import RaffleHowItWorks from "./HowItWorks/RaffleHowItWorks.vue";
import RafflePreviousWinner from "./PreviousWinner/RafflePreviousWinner.vue";
import RaffleTopUsers from "./TopUsers/RaffleTopUsers.vue";
</script>

<template>
   <Header />
   <Main>
      <RaffleBanner />
      <RaffleHowItWorks />
      <section class="raffle-summary">
         <RaffleTopUsers />
         <RafflePreviousWinner />
      </section>
      <Footer />
   </Main>
</template>

<style scoped lang="scss">
@use "@styles/mixins/mediaQuery.scss" as *;

.raffle-summary {
   display: grid;
   grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
   gap: var(--space-6);
   margin: 0 var(--space-4) var(--space-6);

   @include mq-tablet {
      grid-template-columns: 1fr;
   }

   @include mq-mobile {
      grid-template-columns: 1fr;
      gap: var(--space-3);
      margin: 0 var(--space-3) var(--space-5);
   }
}
</style>
