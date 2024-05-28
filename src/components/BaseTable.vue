<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Cities</h1>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <BaseButton title="Add City" type="primary" @onClick="addCity" />
      </div>
    </div>
    <div class="mt-8 flow-root">
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
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ city.population }}
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    @click="changeCity(city.id)"
                  >
                    <PencilSquareIcon class="size-6 text-blue-500 cursor-pointer" />
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    @click="deleteCity(city.id)"
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
import type { City } from '@/types/city'
import { useCityStore } from '@/stores/cityStore'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'

const cityStore = useCityStore()

interface Props {
  data: City[]
}

const props = defineProps<Props>()

const emit = defineEmits(['addCity'])

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'population', label: 'Population' }
]

const cities = computed(() => props.data)

function addCity() {
  emit('addCity')
}

function changeCity(id: number) {
  const newCity: Partial<City> = {
    name: 'Bréma',
    description: 'mese',
    population: 4
  }
  //opcionális hibakeresés
  /* console.log(`A beküldött adatok: id-> ${id} newCity -> ${newCity}`)
  console.log(newCity) */
  cityStore.changeCity(id, newCity)
}

function deleteCity(id: Number) {
  cityStore.deleteCity(id)
}
</script>
