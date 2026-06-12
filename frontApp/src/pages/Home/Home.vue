<script setup lang="ts">
import Header from "@components/Layout/Header/Header.vue";
import Footer from "@components/Layout/Footer/Footer.vue";
import Main from "@components/Layout/Main/Main.vue";
import Hero from "./Hero/Hero.vue";
import NextEvents from "./NextEvents/NextEvents.vue";
import Features from "./Features/Features.vue";
import BotPublish from "./BotPublish/BotPublish.vue";
</script>

<template>
   <Header />
   <Main>
      <Hero />
      <NextEvents />
      <Features />
      <BotPublish />
      <Footer />
   </Main>
</template>
