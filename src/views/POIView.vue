<template>
  <OriginTable
    :data="POIs"
    :headerList="headers"
    @add="addPOI"
    @edit="changePOI"
    @deleteEmit="openDeleteModal"
  />
  <DeleteModal
    :isOpen="isModalOpen"
    :idToDelete="idToDelete"
    :data="singlePOI"
    @close="closeModal"
    @delete-element="deletePOI"
  />
  <button @click="addPOI">Add Point Of Interest</button>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import OriginTable from '../components/OriginTable.vue'
import DeleteModal from '../components/DeleteModal.vue'
import { usePOIStore } from '@/stores/POIStore'
import type { POI } from '@/types/POI'

const POIStore = usePOIStore()

const POIs = computed(() => POIStore.POIs)
const singlePOI = computed(() => POIStore.singlePOI)
const headers = ['Name', 'Description']
const isModalOpen = ref(false)
const idToDelete = ref(0)

function openDeleteModal(id: number) {
  idToDelete.value = id
  POIStore.getPOI(id)
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

function deletePOI(id: number) {
  POIStore.deletePoint(id)
}

onMounted(async () => {
  await POIStore.getPOIs()
  //cities.value = cityStore.cities
  /*  console.log('Cities: ', cities.value) */
})
</script>
