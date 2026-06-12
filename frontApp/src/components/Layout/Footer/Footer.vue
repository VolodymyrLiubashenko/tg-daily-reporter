<script setup lang="ts">
import { getCurrentYear } from "@/utils/date/day";

const currentYear = getCurrentYear();
</script>

<template>
   <footer class="footer">
      <div class="footer__container">
         <p class="footer__copyright">
            © {{ currentYear }} TG Daily Reporter. All rights reserved.
         </p>
      </div>
   </footer>
</template>

<style scoped lang="scss">
.footer {
   position: relative;
   bottom: 0;
   left: 0;
   width: 100%;

   margin-top: auto;
   background: var(--color-surface);
   box-shadow: var(--shadow-sm);
}

.footer__container {
   display: flex;
   align-items: center;
   width: 100%;
   padding: var(--space-5) var(--space-5);
}
</style>
