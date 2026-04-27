<script setup>
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'

const open = defineModel({
  type: Boolean,
  default: false,
})

const dialogRef = useTemplateRef('dialogRef')

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
    <div class="modal-box bg-transparent w-fit shadow-none">
      <i class="loading loading-spinner loading-lg"></i>
    </div>
    <div class="modal-backdrop flex juatify-center items-center"></div>
  </dialog>
</template>
