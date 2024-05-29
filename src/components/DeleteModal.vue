<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div>
                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-500"
                >
                  <span><TrashIcon class="size-8 text-black cursor-pointer" /></span>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900"
                    >Are you sure you want to delete the following item?</DialogTitle
                  >
                  <div class="flex flex-row">
                    <div class="w-5/12">
                      <img class="cursor-pointer w-44 p-5" src="../../stop.svg" />
                    </div>
                    <div class="w-7/12 mt-2 flex flex-col align-center">
                      <div
                        v-for="(value, key) in data || {}"
                        :key="key"
                        class="max-h-12 text-clip overflow-hidden"
                      >
                        <span class="font-semibold">{{ key }}:</span> {{ value }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  @click="deleteElement(id)"
                >
                  Delete
                </button>
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  @click="closeModal"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { POI } from '@/types/POI'
import type { City } from '@/types/city'
import { TrashIcon } from '@heroicons/vue/24/outline'

interface Props {
  isOpen: boolean
  idToDelete: number
  data: POI | City | null
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'deleteElement'])

const open = computed(() => props.isOpen)
const id = computed(() => props.idToDelete)
const data = computed(() => props.data)

function closeModal() {
  emit('close')
}

function deleteElement(id: number) {
  emit('deleteElement', id)
  emit('close')
}
</script>
