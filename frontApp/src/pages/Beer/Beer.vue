<script setup lang="ts">
import Main from "@components/Layout/Main/Main.vue";
import Header from "@components/Layout/Header/Header.vue";
import Footer from "@components/Layout/Footer/Footer.vue";
import BeerBanner from "./Banner/BeerBanner.vue";
import BeersGrid from "./BeersGrid/BeersGrid.vue";
</script>

<template>
   <Header />
   <Main>
      <BeerBanner />
      <BeersGrid />
      <Footer />
   </Main>
</template>
