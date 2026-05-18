<script setup>
import { onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch } from 'vue'
import { useStorage, useDebounceFn } from '@vueuse/core'

import * as Blockly from 'blockly'
import { blocks } from 'blockly/blocks'
import { boards } from '@/blockly/boards'
import { changeLanguage, setPinBlock } from '@/blockly/customBlocks'
import { wemosInoGenerator } from '@/blockly/customGenerators'
import { toolbox } from '@/blockly/toolbox'

const props = defineProps({
  language: {
    type: String,
    default: 'easyGermanLanguage',
  },
  board: {
    type: String,
    default: 'wemos',
  },
})

const blocklyContainer = useTemplateRef('blocklyContainer')
const workspace = shallowRef(null)

const storageState = useStorage('blockly-esp-workspace')

const getBoardConfig = (boardName) => boards[boardName] ?? boards.wemos

const applyLanguage = (language) => {
  if (!workspace.value) {
    return
  }

  changeLanguage(language)

  const workspaceState = Blockly.serialization.workspaces.save(workspace.value)
  workspace.value.clear()
  Blockly.serialization.workspaces.load(workspaceState, workspace.value)
}

const applyBoardPins = (boardName) => {
  const boardConfig = getBoardConfig(boardName)
  setPinBlock(boardConfig.pins)
}

const saveState = () => {
  if (!workspace.value) {
    return null
  }

  return Blockly.serialization.workspaces.save(workspace.value)
}

const loadState = (state) => {
  if (!workspace.value || !state) {
    return
  }

  workspace.value.clear()
  Blockly.serialization.workspaces.load(state, workspace.value)
}

const generateCode = () => {
  if (!workspace.value) {
    return ''
  }

  return wemosInoGenerator.workspaceToCode(workspace.value)
}

defineExpose({
  saveState,
  loadState,
  generateCode,
})

// Automatically save workspace state to localStorage every 15 seconds
const saveWorkspaceInLocalStorage = () => {
  if (workspace.value) {
    const state = saveState()
    if (state) {
      storageState.value = JSON.stringify(state)
    }
  }
}

const debouncedSave = useDebounceFn(
  () => {
    saveWorkspaceInLocalStorage()
  },
  10000,
  { maxWait: 15000 },
)

const onWorkspaceChange = (event) => {
  if (event.isUiEvent) return
  debouncedSave()
}

onBeforeUnmount(() => {
  if (workspace.value) {
    saveWorkspaceInLocalStorage()
  }
})

onMounted(() => {
  try {
    Blockly.common.defineBlocks(blocks)
  } catch (error) {
    if (!String(error?.message ?? error).includes('already defined')) {
      throw error
    }
  }

  applyBoardPins(props.board)
  changeLanguage(props.language)

  workspace.value = Blockly.inject(blocklyContainer.value, {
    toolbox,
  })

  workspace.value.addChangeListener(onWorkspaceChange)

  // Load workspace state from localStorage on mount (if available)
  if (storageState.value) {
    loadState(JSON.parse(storageState.value))
  }
})

watch(
  () => props.language,
  (nextLanguage) => {
    applyLanguage(nextLanguage)
  },
)

watch(
  () => props.board,
  (nextBoard) => {
    applyBoardPins(nextBoard)
  },
)

onBeforeUnmount(() => {
  if (!workspace.value) {
    return
  }

  workspace.value.dispose()
  workspace.value = null
})
</script>

<template>
  <div ref="blocklyContainer" class="w-full h-[80dvh] overflow-auto text-black"></div>
</template>
