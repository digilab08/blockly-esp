<script setup>
import { computed, onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'

const props = defineProps({
  state: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
})

const open = defineModel({
  type: Boolean,
  default: false,
})

const dialogRef = useTemplateRef('dialogRef')

const alertClass = computed(() =>
  props.state === 'error' ? 'alert alert-error w-fit' : 'alert alert-success w-fit',
)

const stateLabel = computed(() => (props.state === 'error' ? 'Fehler' : 'Erfolgreich'))

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
  if (!dialogRef.value) {
    return
  }

  dialogRef.value.removeEventListener('close', handleDialogClose)
})
</script>

<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box flex flex-col gap-3 min-w-1/2 w-auto max-w-full m-3">
      <div :class="alertClass">
        <h1 class="text-3xl font-bold text-center">{{ stateLabel }}</h1>
      </div>
      <pre class="whitespace-pre-wrap"><code>{{ props.message }}</code></pre>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
