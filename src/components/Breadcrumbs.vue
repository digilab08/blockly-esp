<!-- Breadcrumbs.vue -->
<script setup>
/**
 * Breadcrumbs component for Vue 3 using daisyUI and Vue Router.
 *
 * Renders a breadcrumb trail based on a simple object where:
 * - keys are the visible labels
 * - values are the route targets (strings) for <RouterLink>
 *
 * The last breadcrumb is rendered as plain text (not clickable) and marked with aria-current="page".
 */

import { computed } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * @typedef {Object.<string, string>} BreadcrumbMap
 * A map where each key is the label and the value is the route path (e.g., "/documents").
 */

const props = defineProps({
  /**
   * Map of breadcrumb labels to route paths.
   * Example: { Home: '/', Documents: '/documents', 'Add Document': '/documents/new' }
   * Iteration order follows the insertion order of the object's keys (except integer-like keys).
   * @type {BreadcrumbMap}
   */
  items: {
    type: Object,
    required: true,
  },
  /**
   * Optional text utility classes
   * @type {string}
   */
  class: {
    type: String,
    default: 'text-sm',
  },
  /**
   * Accessible label for the breadcrumb navigation landmark.
   * @type {string}
   */
  ariaLabel: {
    type: String,
    default: 'Breadcrumb',
  },
})

/**
 * Convert the items object into an array of [label, to] pairs.
 * This preserves the key insertion order for non-integer-like keys.
 * @returns {Array<[string, string]>}
 */
const crumbs = computed(() => Object.entries(props.items))
</script>

<template>
  <nav :aria-label="props.ariaLabel" class="w-full">
    <div class="breadcrumbs" :class="props.textClass">
      <ul>
        <!-- Render each breadcrumb; the last one is plain text -->
        <li
          v-for="([label, to], idx) in crumbs"
          :key="label"
          :aria-current="idx === crumbs.length - 1 ? 'page' : undefined"
        >
          <RouterLink v-if="idx < crumbs.length - 1" :to="to">
            {{ label }}
          </RouterLink>
          <span v-else class="font-semibold text-base-content/70 cursor-default">
            {{ label }}
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>
