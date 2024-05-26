<template>
  <OriginTable
    :data="POIs"
    :headerList="headers"
    @add="openModal"
    @edit="changePOI"
    @deleteEmit="deletePOI"
  />
  <BaseModal :isOpen="isModalOpen" @close="closeModal" />
  <button @click="addPOI">Add Point Of Interest</button>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import OriginTable from '../components/OriginTable.vue'
import BaseModal from '../components/BaseModal.vue'
import { usePOIStore } from '@/stores/POIStore'
import type { POI } from '@/types/POI'

const POIStore = usePOIStore()

const POIs = computed(() => POIStore.POIs)
const headers = ['Name', 'Description']
const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function addPOI() {
  const newPOI: Partial<POI> = {
    name: 'LondonEyes',
    description: 'enjoyfull',
    city_id: 16
  }
  //opcionális hibakeresés
  POIStore.addPOI(newPOI)
}

function changePOI(id: number) {
  const newPOI: Partial<POI> = {
    name: 'A ló',
    description: 'szentgyörgyön',
    city_id: 4
  }

  POIStore.changePoint(id, newPOI)
}

function deletePOI(id: Number) {
  POIStore.deletePoint(id)
}

onMounted(async () => {
  await POIStore.getPOIs()
  //cities.value = cityStore.cities
  /*  console.log('Cities: ', cities.value) */
})
</script>
