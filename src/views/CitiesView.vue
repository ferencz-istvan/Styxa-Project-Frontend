<template>
  <OriginTable
    :data="cities"
    :headerList="headers"
    @add="openAddModal"
    @edit="openChangeModal"
    @deleteEmit="openDeleteModal"
  />
  <DeleteModal
    :isOpen="isDeleteModalOpen"
    :idToDelete="idToDelete"
    :data="singleCity"
    @close="closeDeleteModal"
    @delete-element="deleteCity"
  />
  <!-- adding a new element -->
  <FormModal
    :type-string="type"
    :isOpen="isAddModalOpen"
    :data="dataForFormModal"
    @close="closeAddModal"
    @send-data="addCity"
  />
  <!-- editing an element -->
  <FormModal
    :type-string="type"
    :isOpen="isChangeModalOpen"
    :data="dataForFormModal"
    @close="closeChangeModal"
    @send-data="changeCity"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import OriginTable from '../components/OriginTable.vue'
import DeleteModal from '../components/DeleteModal.vue'
import FormModal from '../components/FormModal.vue'
import { useCityStore } from '@/stores/cityStore'
import { usePOIStore } from '@/stores/POIStore'
import type { City } from '@/types/city'

const cityStore = useCityStore()

const cities = computed(() => cityStore.cities)
const singleCity = computed(() => cityStore.singleCity)

const POIStore = usePOIStore()

const headers = ['Name', 'Description']
const type = 'city'
const baseDataForFormModal = {
  id: 0,
  name: '',
  description: '',
  population: 0
}
let dataForFormModal: City
dataForFormModal = structuredClone(baseDataForFormModal)

const isDeleteModalOpen = ref(false)
const isAddModalOpen = ref(false)
const isChangeModalOpen = ref(false)
const idToDelete = ref(0)

async function openDeleteModal(id: number) {
  idToDelete.value = id
  await cityStore.getCity(id.toString())
  isDeleteModalOpen.value = true
}
function closeDeleteModal() {
  isDeleteModalOpen.value = false
}

function openAddModal() {
  isAddModalOpen.value = true
}
function closeAddModal() {
  isAddModalOpen.value = false
}

async function openChangeModal(id: number) {
  await cityStore.getCity(id.toString())
  if (cityStore.singleCity === null) {
    return
  }

  dataForFormModal.id = cityStore.singleCity.id
  dataForFormModal.name = cityStore.singleCity.name
  dataForFormModal.description = cityStore.singleCity.description
  dataForFormModal.population = cityStore.singleCity.population

  isChangeModalOpen.value = true
}
function closeChangeModal() {
  dataForFormModal = structuredClone(baseDataForFormModal)
  isChangeModalOpen.value = false
}

function addCity(data: City) {
  const newCity: Partial<City> = {
    name: data.name,
    description: data.description,
    population: data.population
  }
  //opcionális hibakeresés
  cityStore.addCity(newCity)
}

function changeCity(data: City) {
  const newCity: Partial<City> = {
    name: data.name,
    description: data.description,
    population: data.population
  }

  cityStore.changeCity(data.id, newCity)
}

async function deleteCity(id: number) {
  await POIStore.getPointsOfCity(id)
  if (POIStore.pointsOfCity.length === 0) {
    cityStore.deleteCity(id)
  } else {
    window.alert('You cannot delete this city!!! \n  Points of interests depend on it !!!')
  }

  /*  */
}

onMounted(async () => {
  await cityStore.getCities()
})
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
