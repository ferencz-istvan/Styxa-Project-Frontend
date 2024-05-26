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
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCityStore } from '@/stores/cityStore'
import { computed } from 'vue'

const cityStore = useCityStore()
const singleCity = computed(() => cityStore.singleCity)

interface CityProps {
  id: string
  name: string
  /* description: string
  population: number */
}
const myProp = defineProps<CityProps>()
/* const nameProps = defineProps(['id']) */

onMounted(async () => {
  await cityStore.getCity(myProp.id)
  //cities.value = cityStore.cities
  /* console.log('City: ', singleCity.value) */
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style></style>
