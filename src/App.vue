<script setup>
import { RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen p-3 h-full">
    <main class="flex-1">
      <RouterView />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
