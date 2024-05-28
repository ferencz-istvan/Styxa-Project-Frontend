<template>
  <button :class="buttonStyle" class="px-4 py-2 rounded-lg border" @click="onClick">
    <span class="flex"><PlusIcon class="size-6 text-white cursor-pointer" />{{ title }}</span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'

interface Props {
  title: string
  type: string
}

const props = defineProps<Props>()
const emit = defineEmits(['onClick'])

const buttonStyle = computed(() => {
  if (props.type === 'primary') {
    return 'bg-blue-800 text-white border-color-blue-800'
  }
  if (props.type === 'secondary') {
    return 'bg-gray-50 text-gray-900 border-color-gray-900'
  }
  return ''
})

function onClick() {
  emit('onClick')
}
</script>
