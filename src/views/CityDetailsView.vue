<template>
  <p>Id: {{ id }}</p>
  <h1>A város neve: {{ name }}</h1>
  <br />
  <h3>Népesség: {{ singleCity?.population }}</h3>
  <br />
  <p>
    <b>Rövid leírás: </b>
    {{ singleCity?.description }}
  </p>
  <br />
  <div class="w-[980px] flex flex-row flex-wrap">
    <div
      v-for="point in pointsOfCity"
      :key="point.id"
      class="max-h-[420px] overflow-y-auto rounded-md w-72 bg-cyan-800 shadow-current text-white m-3 p-3"
    >
      <h3>{{ point.name }}</h3>
      <p>{{ point.description }}</p>
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
