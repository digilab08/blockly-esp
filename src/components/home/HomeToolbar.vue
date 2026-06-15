<script setup>
import { computed } from 'vue'
import boards from '@/blockly/boards.json'
import { shallowRef } from 'vue'

const model = defineModel({
  default: () => ({
    language: 'easyGermanLanguage',
    board: Object.keys(boards)[0],
    uploadSelect: 'file',
  }),
})

const props = defineProps({
  isRunning: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['import-file-change', 'export-file', 'run-click'])

const updateValues = (patch) => {
  model.value = {
    ...(model.value ?? {}),
    ...patch,
  }
}

const languageValue = computed({
  get: () => model.value?.language,
  set: (value) => {
    updateValues({ language: value })
  },
})

const boardValue = computed({
  get: () => model.value?.board,
  set: (value) => {
    updateValues({ board: value })
  },
})

const uploadSelectValue = computed({
  get: () => model.value?.uploadSelect,
  set: (value) => {
    updateValues({ uploadSelect: value })
  },
})

const handleImportFileChange = (event) => {
  const nextFile = event.target.files?.[0] ?? null
  emit('import-file-change', nextFile)
  event.target.value = ''
}

const handleExportFileClick = () => {
  emit('export-file')
}

const boardsList = shallowRef(Object.keys(boards))

const handleRunButtonClick = () => {
  emit('run-click')
}
</script>

<template>
  <div class="w-full flex justify-end gap-3 flex-wrap">
    <select v-model="languageValue" class="select select-bordered">
      <option value="easyGermanLanguage">Deutsche Sprache</option>
      <option value="technicalLanguage">Technisch Sprache</option>
    </select>

    <!-- Import/Export project -->
    <div class="join">
      <button type="button" class="btn btn-secondary join-item" @click="handleExportFileClick">
        <span> Speichern </span>
        <img src="/images/download.svg" alt="download icon" class="h-8" />
      </button>

      <label class="btn btn-primary join-item">
        <span>Öffnen</span>
        <img src="/images/upload.svg" alt="upload icon" class="h-8" />
        <input type="file" class="hidden" accept=".json" @change="handleImportFileChange" />
      </label>
    </div>

    <!-- Board Selection -->
    <select v-model="boardValue" class="select select-bordered" title="Verwendeter Microcontroller">
      <option v-for="board in boardsList" :key="board" :value="board">
        {{ boards[board].name }}
      </option>
    </select>

    <!-- Run Code -->
    <div class="join">
      <button
        class="btn btn-success join-item"
        title="Code ausführen"
        :disabled="props.isRunning"
        @click="handleRunButtonClick"
      >
        <img src="/images/run.svg" alt="run arrow" class="h-full w-fit" />
      </button>
      <select
        v-model="uploadSelectValue"
        class="select select-success select-bordered join-item"
        :disabled="props.isRunning"
      >
        <option value="file">Datei</option>
        <option value="code">Code</option>
        <option value="upload">Upload</option>
      </select>
    </div>
  </div>
</template>
