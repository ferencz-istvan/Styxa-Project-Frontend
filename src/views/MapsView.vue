<template>
  <div clas="w-full h-full bg-pink-400 flex flex-col justify-center p-56">
    <div class="flex flex-row">
      <button @click="add = true" class="m-5 p-3 bg-teal-700 rounded-md text-white">
        Add a new map
      </button>
      <button @click="add = false" class="m-5 p-3 bg-teal-700 rounded-md text-white">
        Delete a map
      </button>
    </div>
    <div v-if="add" class="p-6 border-2 border-teal-700">
      <p class="my-5 font-semibold">Container for adding a map</p>
      <form>
        <label for="maproute">Maproute:</label><br />
        <textarea
          id="maproute"
          name="maproute"
          rows="6"
          cols="65"
          v-model="addedMapRoute"
          class="bg-teal-800 text-white"
        ></textarea>

        <br />
        <label for="cities">location of the point:</label>
        <select
          v-model="selectedCityId"
          name="cities"
          id="cities"
          class="p-2 m-2 bg-teal-800 text-white"
        >
          <option v-for="city in cityStore.cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
        <br />
      </form>
      <button @click="sendData" class="m-5 p-3 bg-teal-700 rounded-md text-white">Add map</button>
    </div>
    <div v-else class="p-6 border-2 border-teal-700">Delete map container:</div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCityStore } from '@/stores/cityStore'
import { useCityMapStore } from '@/stores/mapStore'
import type { cityMap } from '@/types/cityMap'
const cityStore = useCityStore()
const mapStore = useCityMapStore()
const add = ref(true)
const addedMapRoute = ref('')
const sendedMapRpote = ref('')
const selectedCityId = ref(0)

function getTextBetweenQuotes(str: string) {
  // Use regular expression to find the text between the first and second double quote
  const match = str.match(/"([^"]*)"/)
  if (match && match[1]) {
    return match[1]
  } else {
    return null
  }
}

function sendData() {
  /* console.log(addedMapRoute.value)
  console.log(selectedCityId.value) */

  if (!addedMapRoute.value) return

  sendedMapRpote.value = getTextBetweenQuotes(addedMapRoute?.value) as string

  const newMap: Partial<cityMap> = {
    maproute: sendedMapRpote.value,
    city_id: selectedCityId.value
  }
  console.log(newMap)
  mapStore.addCityMap(newMap)
}

onMounted(async () => {
  await cityStore.getCities()
})
</script>
