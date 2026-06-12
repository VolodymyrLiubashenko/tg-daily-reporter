<template>
   <main class="main">
      <slot />
   </main>
</template>

<style scoped lang="scss">
.main {
   flex: 1;
   display: flex;
   flex-direction: column;
   align-items: stretch;
   width: 100%;
   padding: 72px 0 0;
}
</style>
