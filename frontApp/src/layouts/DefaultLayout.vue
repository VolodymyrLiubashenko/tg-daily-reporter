<script setup lang="ts">
import Footer from "@components/Layout/Footer/Footer.vue";
import Header from "@components/Layout/Header/Header.vue";
import Main from "@components/Layout/Main/Main.vue";
</script>

<template>
   <Header />
   <Main>
      <slot />
      <Footer />
   </Main>
</template>
