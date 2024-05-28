<template>
  <OriginTable
    :data="POIs"
    :headerList="headers"
    @add="openAddModal"
    @edit="openChangeModal"
    @deleteEmit="openDeleteModal"
  />
  <DeleteModal
    :isOpen="isDeleteModalOpen"
    :idToDelete="idToDelete"
    :data="singlePOI"
    @close="closeDeleteModal"
    @delete-element="deletePOI"
  />
  <!-- adding a new element -->
  <FormModal
    :type-string="type"
    :isOpen="isAddModalOpen"
    :data="dataForFormModal"
    @close="closeAddModal"
    @send-data="addPOI"
  />
  <!-- editing an element -->
  <FormModal
    :type-string="type"
    :isOpen="isChangeModalOpen"
    :data="dataForFormModal"
    @close="closeChangeModal"
    @send-data="changePOI"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import OriginTable from '../components/OriginTable.vue'
import DeleteModal from '../components/DeleteModal.vue'
import FormModal from '../components/FormModal.vue'
import { usePOIStore } from '@/stores/POIStore'
import type { POI } from '@/types/POI'

const POIStore = usePOIStore()

const POIs = computed(() => POIStore.POIs)
const singlePOI = computed(() => POIStore.singlePOI)

const headers = ['Name', 'Description']
const type = 'POI'
const baseDataForFormModal = {
  id: 0,
  name: '',
  description: '',
  city_id: 0
}
let dataForFormModal = structuredClone(baseDataForFormModal)

const isDeleteModalOpen = ref(false)
const isAddModalOpen = ref(false)
const isChangeModalOpen = ref(false)
const idToDelete = ref(0)

function openDeleteModal(id: number) {
  idToDelete.value = id
  POIStore.getPOI(id)
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

function openChangeModal(id: number) {
  dataForFormModal.id = id
  isChangeModalOpen.value = true
}
function closeChangeModal() {
  dataForFormModal = structuredClone(baseDataForFormModal)
  isChangeModalOpen.value = false
}

function addPOI(data: POI) {
  const newPOI: Partial<POI> = {
    name: data.name,
    description: data.description,
    city_id: data.city_id
  }
  //opcionális hibakeresés
  POIStore.addPOI(newPOI)
  location.reload() //not the best, but currently we dont know the id the new pont yet
}

function changePOI(data: POI) {
  const newPOI: Partial<POI> = {
    name: data.name,
    description: data.description,
    city_id: data.city_id
  }

  POIStore.changePoint(data.id, newPOI)
}

function deletePOI(id: number) {
  POIStore.deletePoint(id)
}

onMounted(async () => {
  await POIStore.getPOIs()
})
</script>
