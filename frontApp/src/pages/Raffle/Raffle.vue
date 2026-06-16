<script setup lang="ts">
import Header from "@components/Layout/Header/Header.vue";
import Main from "@components/Layout/Main/Main.vue";
import Footer from "@components/Layout/Footer/Footer.vue";
import RaffleBanner from "./Banner/RaffleBanner.vue";
import RaffleHowItWorks from "./HowItWorks/RaffleHowItWorks.vue";
import RaffleJoinTelegram from "./JoinTelegram/RaffleJoinTelegram.vue";
import RaffleSummary from "./Summary/RaffleSummary.vue";
import RaffleWinners from "./Winners/RaffleWinners.vue";
</script>

<template>
   <Header />
   <Main>
      <RaffleBanner />
      <RaffleHowItWorks />
      <RaffleSummary />
      <RaffleWinners />
      <RaffleJoinTelegram />
      <Footer />
   </Main>
</template>
