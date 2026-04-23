<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const breadcrumbsObj = {
  Home: '/',
  Impressum: '/impressum',
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <Breadcrumbs :items="breadcrumbsObj" />
    <h1 class="text-4xl font-bold mb-4">Impressum</h1>
    <div class="bg-base-200 shadow p-6 rounded-box">
      <p class="mb-4">
        DigiLab <br />
        Alexander Coopmans<br />
        Webschulstraße 41 - 43<br />
        41065 Mönchengladbach<br />
        E-Mail:
        <a class="link" href="mailto:alexander.coopmans@protonmail.com">
          alexander.coopmans@protonmail.com
        </a>
      </p>
    </div>
  </div>
</template>
