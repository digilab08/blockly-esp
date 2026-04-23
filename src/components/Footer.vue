<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="w-full flex justify-around p-3 mt-6">
    <RouterLink to="/impressum" class="link">Impressum</RouterLink>
    <RouterLink to="/datenschutzerklaerung" class="link">Datenschutzerklärung</RouterLink>
  </div>
</template>
