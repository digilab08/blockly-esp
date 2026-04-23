<script setup>
import Section from '@/components/Section.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const breadcrumbsObj = {
  Home: '/',
  Datenschutzerklärung: '/datenschutzerklaerung',
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <Breadcrumbs :items="breadcrumbsObj" />
    <h1 class="text-4xl font-bold text-primary mb-4">Datenschutzerklärung</h1>

    <Section>
      <template #title>1. Verantwortliche Stelle</template>

      DigiLab <br />
      Alexander Coopmans<br />
      Webschulstraße 41 - 43<br />
      41065 Mönchengladbach <br />
      E-Mail:
      <a class="link" href="mailto:alexander.coopmans@protonmail.com"
        >alexander.coopmans@protonmail.com</a
      ><br />
    </Section>

    <Section>
      <template #title> 2. Bereitstellung der Website über Github </template>

      Diese Website sowie sämtliche Inhalte werden vollständig über die Dienste von Github
      bereitgestellt. Wir betreiben keinen eigenen Server – sämtliche Datenverarbeitungen erfolgen
      ausschließlich über die Infrastruktur von Github. Die Website kann auch lokal betrieben
      werden.
    </Section>

    <Section>
      <template #title>3. Automatisch erhobene Daten</template>

      Beim Zugriff auf diese Website werden durch die von Github bereitgestellte Infrastruktur
      automatisch technische Daten erhoben, wie z. B.:

      <ul class="list-disc list-inside ml-4">
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>Browser- und Betriebssysteminformationen</li>
      </ul>

      Wir haben keinen direkten Zugriff auf diese Daten, da sie durch die Server von Github
      verarbeitet werden. Weitere Details entnehmen Sie bitte der Datenschutzerklärung von Github
      unter:
      <a
        href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement#github-pages"
        class="link"
        >https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement#github-pages</a
      >.
    </Section>

    <Section>
      <template #title>4. Keine zusätzliche Datenerhebung</template>

      Wir erheben und verarbeiten keine weiteren personenbezogenen Daten. Lediglich die für den
      Betrieb der Website unbedingt erforderlichen Daten, die durch Github automatisch verarbeitet
      werden, fallen an. Diese Daten dienen ausschließlich der Gewährleistung des sicheren und
      reibungslosen Betriebs unserer Website.
    </Section>

    <Section>
      <template #title>5. Ihre Rechte</template>

      Sie haben als betroffene Person folgende Rechte:
      <ul class="list-disc list-inside ml-4">
        <li>Auskunft über die zu Ihrer Person gespeicherten Daten</li>
        <li>Berichtigung unrichtiger Daten</li>
        <li>Löschung oder Einschränkung der Verarbeitung</li>
        <li>Widerspruch gegen die Verarbeitung</li>
        <li>Datenübertragbarkeit</li>
      </ul>

      Für die Ausübung Ihrer Rechte wenden Sie sich bitte an die in den Datenschutzhinweise von
      Github genannten verantwortliche Stelle.
    </Section>

    <Section>
      <template #title> 6. Hinweis zum Widerruf von Einwilligungen </template>

      Da wir selbst keine personenbezogenen Daten auf Basis eigener Einwilligungen erheben, entfällt
      dieser Punkt. Für die durch Github erhobenen Daten gelten deren jeweiligen
      Datenschutzhinweise.
    </Section>
  </div>
</template>
