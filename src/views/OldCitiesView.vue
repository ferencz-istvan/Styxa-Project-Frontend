<template>
  <BaseTable :data="cities" @addCity="openModal" />
  <BaseModal :isOpen="isModalOpen" @close="closeModal" />
  <button @click="addCity">Add City</button>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import BaseTable from '../components/BaseTable.vue'
import BaseModal from '../components/BaseModal.vue'
import { useCityStore } from '@/stores/cityStore'
import type { City } from '@/types/city'

const cityStore = useCityStore()

/* const cities = ref([] as City[]) */
const cities = computed(() => cityStore.cities)
const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function addCity() {
  const newCity: Partial<City> = {
    name: 'London',
    description: 'Capital of the UK',
    population: 330
  }
  //opcionális hibakeresés
  cityStore.addCity(newCity)
}

onMounted(async () => {
  await cityStore.getCities()
  //cities.value = cityStore.cities
  /*  console.log('Cities: ', cities.value) */
})
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
