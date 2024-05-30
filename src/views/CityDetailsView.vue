<template>
  <div>
    <div class="m-3 p-3 flex flex-row">
      <div class="flex w-8/12 justify-center items-center text-[5vw] font-semibold">
        {{ name }}
      </div>

      <div class="flex flex-col w-4/12 justify-center">
        <div class="ml-14 flex flex-col items-start">
          <p>Id: {{ id }}</p>
          <h3 class="text-xl">Population: {{ singleCity?.population }}</h3>
        </div>
      </div>
    </div>
    <div class="p-9 mx-11">
      <p class="mb-11">
        <b>Description: </b><br />
        <span class="mr-6"></span>{{ singleCity?.description }}
      </p>
      <br />
      <div class="w-fit flex flex-row flex-wrap">
        <div
          v-for="point in pointsOfCity"
          :key="point.id"
          class="max-h-[450px] w-96 overflow-y-auto rounded-lg bg-white shadow-current m-3"
        >
          <div class="p-4 bg-teal-700 text-white text-xl">
            <h3>{{ point.name }}</h3>
          </div>
          <div class="p-3 h-fit">
            <p>{{ point.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCityStore } from '@/stores/cityStore'
import { usePOIStore } from '@/stores/POIStore'
import { computed } from 'vue'

const cityStore = useCityStore()
const singleCity = computed(() => cityStore.singleCity)
const POIStore = usePOIStore()
const pointsOfCity = computed(() => POIStore.pointsOfCity)

interface CityProps {
  id: string
  name: string
}
const myProp = defineProps<CityProps>()
/* const nameProps = defineProps(['id']) */

onMounted(async () => {
  await cityStore.getCity(myProp.id)
  await POIStore.getPointsOfCity(Number(myProp.id))
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style></style>
