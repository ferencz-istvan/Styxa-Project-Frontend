<template>
  <div class="px-4 sm:px-6 lg:px-8 bg-red-700">
    <div id="table-header" class="sm:flex sm:items-center bg-slate-300">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900 p-4">Cities</h1>
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
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="city in cities" :key="city.id">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    <RouterLink
                      :to="{
                        name: 'details',
                        params: {
                          id: city.id,
                          name: city.name
                        }
                      }"
                      >{{ city.name }}</RouterLink
                    >
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ city.description }}
                  </td>
                  <!--  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ city.population }}
                  </td> -->
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    @click="editEmit(city.id)"
                  >
                    <PencilSquareIcon class="size-6 text-blue-500 cursor-pointer" />
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    @click="deleteEmit(city.id)"
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

<script lang="ts" setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'
import type { POI } from '@/types/POI'
import type { City } from '@/types/city'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'

interface Props {
  data: POI[] | City[]
  headerList: string[]
}

const props = defineProps<Props>()

const emit = defineEmits(['add', 'edit', 'deleteEmit'])

const headers = props.headerList.map((head) => {
  return { key: head.toLowerCase(), label: head }
})

const cities = computed(() => props.data)

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
