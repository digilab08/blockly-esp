<script setup>
import { ref, useTemplateRef } from 'vue'
import { boards } from '@/blockly/boards'
import BlocklyWorkspace from '@/components/home/BlocklyWorkspace.vue'
import CodeModal from '@/components/home/CodeModal.vue'
import HomeToolbar from '@/components/home/HomeToolbar.vue'
import LoadingModal from '@/components/home/LoadingModal.vue'
import UploadCodeInfoModal from '@/components/home/UploadCodeInfoModal.vue'
import UploadCodeMessageModal from '@/components/home/UploadCodeMessageModal.vue'

const toolbarValues = ref({
  language: 'easyGermanLanguage',
  board: 'wemos',
  uploadSelect: 'file',
})

const workspaceRef = useTemplateRef('workspaceRef')
const fileName = ref('file')
const generatedCode = ref('')
const uploadResult = ref({
  state: '',
  message: '',
})

const isBusy = ref(false)
const isCodeModalOpen = ref(false)
const isUploadInfoModalOpen = ref(false)
const isUploadMessageModalOpen = ref(false)
const isLoadingModalOpen = ref(false)

const getWorkspaceState = () => workspaceRef.value?.saveState?.() ?? null

const loadWorkspaceState = (state) => {
  workspaceRef.value?.loadState?.(state)
}

const requestFileName = () => {
  const userInput = prompt('Bitte gib einen Namen für die Datei an', fileName.value)
  if (userInput === null) {
    throw new Error('Name input canceled by user')
  }

  fileName.value = userInput
  return fileName.value
}

const downloadFile = (content, downloadName, mimeType) => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = downloadName
  document.body.appendChild(anchor)
  anchor.click()

  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

const handleExportFile = async () => {
  const state = getWorkspaceState()
  if (!state) {
    return
  }

  if (typeof window.showSaveFilePicker === 'function') {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName.value || 'file',
        types: [
          {
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          },
        ],
      })

      const writable = await handle.createWritable()
      await writable.write(JSON.stringify(state))
      await writable.close()
      return
    } catch (error) {
      if (error?.name === 'AbortError') {
        return
      }
    }
  }

  try {
    const currentFileName = requestFileName()
    downloadFile(JSON.stringify(state), `${currentFileName}.json`, 'application/json')
  } catch (error) {
    if (error?.message !== 'Name input canceled by user') {
      console.error(error)
    }
  }
}

const handleImportFileChange = async (file) => {
  if (!file) {
    return
  }

  try {
    fileName.value = file.name.replace(/\.[^/.]+$/, '')
    const text = await file.text()
    const state = JSON.parse(text)
    loadWorkspaceState(state)
  } catch (error) {
    console.error(error)
  }
}

const checkUploadService = async () => {
  try {
    const response = await fetch('http://localhost:8080', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    return response.status === 200
  } catch {
    return false
  }
}

const handleUploadAction = async (code) => {
  const isUploadServiceRunning = await checkUploadService()
  if (!isUploadServiceRunning) {
    isUploadInfoModalOpen.value = true
    return
  }

  isLoadingModalOpen.value = true

  try {
    const boardConfig = boards[toolbarValues.value.board] ?? boards.wemos
    const response = await fetch('http://localhost:8080', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        board: boardConfig.id,
      }),
    })

    const data = await response.json()
    uploadResult.value = {
      state: data.state === 'error' ? 'error' : 'success',
      message: data.message,
    }
  } catch (error) {
    uploadResult.value = {
      state: 'error',
      message: error?.message ?? 'Unbekannter Fehler beim Upload.',
    }
  } finally {
    isLoadingModalOpen.value = false
  }

  isUploadMessageModalOpen.value = true
}

const handleRunClick = async () => {
  const nextCode = workspaceRef.value?.generateCode?.() ?? ''
  generatedCode.value = nextCode

  isBusy.value = true
  try {
    switch (toolbarValues.value.uploadSelect) {
      case 'code':
        isCodeModalOpen.value = true
        break
      case 'file':
        try {
          const currentFileName = requestFileName()
          downloadFile(nextCode, `${currentFileName}.ino`, 'text/plain')
        } catch (error) {
          if (error?.message !== 'Name input canceled by user') {
            console.error(error)
          }
        }
        break
      case 'upload':
        await handleUploadAction(nextCode)
        break
    }
  } finally {
    isBusy.value = false
  }
}
</script>

<template>
  <main class="min-h-screen p-3 flex flex-col gap-3">
    <HomeToolbar
      v-model="toolbarValues"
      :is-running="isBusy"
      @import-file-change="handleImportFileChange"
      @export-file="handleExportFile"
      @run-click="handleRunClick"
    />
    <BlocklyWorkspace
      ref="workspaceRef"
      :language="toolbarValues.language"
      :board="toolbarValues.board"
    />
  </main>
  <CodeModal v-model="isCodeModalOpen" :code="generatedCode" />
  <UploadCodeInfoModal v-model="isUploadInfoModalOpen" />
  <LoadingModal v-model="isLoadingModalOpen" />
  <UploadCodeMessageModal
    v-model="isUploadMessageModalOpen"
    :state="uploadResult.state"
    :message="uploadResult.message"
  />
</template>
