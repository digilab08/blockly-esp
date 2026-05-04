<script setup>
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
})

const open = defineModel({
  type: Boolean,
  default: false,
})

const dialogRef = useTemplateRef('dialogRef')
const copyIcon = ref('/images/copy.svg')
let resetCopyTimer = null

const syncDialogState = (shouldBeOpen) => {
  if (!dialogRef.value) {
    return
  }

  if (shouldBeOpen && !dialogRef.value.open) {
    dialogRef.value.showModal()
    return
  }

  if (!shouldBeOpen && dialogRef.value.open) {
    dialogRef.value.close()
  }
}

const handleDialogClose = () => {
  open.value = false
}

const handleCopyCode = async () => {
  await navigator.clipboard.writeText(props.code)
  copyIcon.value = '/images/check.svg'

  if (resetCopyTimer) {
    clearTimeout(resetCopyTimer)
  }

  resetCopyTimer = setTimeout(() => {
    copyIcon.value = '/images/copy.svg'
  }, 1000)
}

watch(
  open,
  (isOpen) => {
    syncDialogState(isOpen)
  },
  { immediate: true },
)

onMounted(() => {
  if (!dialogRef.value) {
    return
  }

  syncDialogState(open.value)
  dialogRef.value.addEventListener('close', handleDialogClose)
})

onBeforeUnmount(() => {
  if (resetCopyTimer) {
    clearTimeout(resetCopyTimer)
  }

  if (!dialogRef.value) {
    return
  }

  dialogRef.value.removeEventListener('close', handleDialogClose)
})
</script>

<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box flex flex-col gap-3">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-bold">Code</h3>
        <form method="dialog">
          <button class="btn btn-sm btn-circle">✕</button>
        </form>
      </div>

      <div class="mockup-code p-3 relative">
        <button
          class="btn btn-primary btn-sm btn-circle absolute top-1 right-1"
          @click="handleCopyCode"
        >
          <img :src="copyIcon" alt="copy" class="h-4" />
        </button>
        <pre class="whitespace-pre-wrap"><code>{{ props.code }}</code></pre>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
