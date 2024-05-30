<template>
  <div class="my-9 px-4 sm:px-4 lg:px-8">
    <div id="table-header" class="md:flex md:items-center">
      <div class="sm:flex-auto">
        <div
          v-if="props.headerList.length <= 2"
          class="flex flex-row align-center text-base font-semibold leading-6 text-gray-900 p-4"
        >
          <h1 class="mr-6">Cities</h1>
          <img
            class="my-[-5px] cursor-pointer w-10 hover:drop-shadow-lg"
            src="../../building.svg"
          />
        </div>
        <div
          v-else
          class="flex flex-row align-center text-base font-semibold leading-6 text-gray-900 p-4"
        >
          <h1 class="mr-6">Points of interests</h1>
          <img
            class="my-[-5px] cursor-pointer w-10 hover:drop-shadow-lg"
            src="../../city-pointer.svg"
          />
        </div>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <BaseButton title="Add" type="primary" @onClick="addEmit" />
      </div>
    </div>
    <div id="table-content" class="mt-6 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    v-for="header in headers"
                    :key="header.key"
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ header.label }}
                  </th>
                  <th
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Edit
                  </th>
                  <th
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="item in entities" :key="item.id as number">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    <div v-if="props.headerList.length < 3">
                      <RouterLink
                        :to="{
                          name: 'details',
                          params: {
                            id: item.id as number,
                            name: item.name as string
                          }
                        }"
                        >{{ item.name }}</RouterLink
                      >
                    </div>
                    <div v-else>{{ item.name }}</div>
                  </td>
                  <td
                    class="max-w-sm w-3/12 truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    {{ item.description }}
                  </td>
                  <td
                    v-if="props.headerList.length > 2"
                    class="max-w-md truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    {{ item.city_name }}
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    @click="editEmit(item.id as number)"
                  >
                    <PencilSquareIcon class="size-6 text-blue-500 cursor-pointer" />
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    @click="deleteEmit(item.id as number)"
                  >
                    <TrashIcon class="size-6 text-blue-500 cursor-pointer" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends Record<string, unknown>">
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'

interface Props {
  data: Array<T>
  headerList: string[]
}

const props = defineProps<Props>()

const emit = defineEmits(['add', 'edit', 'deleteEmit'])

const headers = props.headerList.map((head) => {
  return { key: head.toLowerCase(), label: head }
})

const entities = computed(() => props.data)

function addEmit() {
  emit('add')
}

function editEmit(id: number) {
  emit('edit', id)
}

function deleteEmit(id: number) {
  emit('deleteEmit', id)
}
</script>
