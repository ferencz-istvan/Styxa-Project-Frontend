<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div>
                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100"
                >
                  <span><PencilIcon class="size-8 text-black cursor-pointer" /></span>
                </div>
                <div class="flex flex-column mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900"
                    ><span v-if="(thisData as POI | City).id === 0"
                      >Add a new
                      <span v-if="typeString === 'city'">city</span>
                      <span v-else>point of interest</span>
                      element!</span
                    >
                    <span v-else> Change the properties of the element!</span>
                  </DialogTitle>
                  <form>
                    <div v-for="(value, key) in thisData || {}" :key="key">
                      <label
                        class="m-3"
                        v-if="key != 'id' && key != 'city_id'"
                        :for="key"
                        :placeholder="value"
                        >{{ key }}:</label
                      >
                      <input
                        class="m-2 p-2 bg-cyan-100"
                        style="width: auto"
                        v-if="key != 'id' && key != 'city_id'"
                        v-model="(objectForEmit as POI | City)[key]"
                        :id="key"
                        :name="key"
                        :type="typeof value"
                      />
                    </div>
                    <div v-if="props.typeString === 'POI'">
                      <label for="cities">location of the point:</label>
                      <select
                        v-model="selectedIdForCity"
                        name="cities"
                        id="cities"
                        class="p-2 m-2 bg-cyan-100"
                      >
                        <option v-for="city in cityStore.cities" :key="city.id" :value="city.id">
                          {{ city.name }}
                        </option>
                      </select>
                    </div>
                  </form>
                  <div class="p-1 m-2 flex self-center">
                    <img src="../../factory.svg" width="120" />
                  </div>

                  <div class="mt-2"></div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  @click="verifyData"
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                >
                  <input type="submit" />
                </button>
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  @click="closeModal"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { POI } from '@/types/POI'
import type { City } from '@/types/city'
import { PencilIcon } from '@heroicons/vue/24/outline'
import { useCityStore } from '@/stores/cityStore'

interface Props {
  isOpen: boolean
  data: City | POI | null
  typeString: 'city' | 'POI'
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'sendData'])

const open = computed(() => props.isOpen)
const thisData = computed(() => props.data)
let objectForEmit: City | POI | null
objectForEmit = props.data
const cityStore = useCityStore()
const selectedIdForCity = ref(0)

function closeModal() {
  emit('close')
}

watch(
  () => props.isOpen,
  () => {
    objectForEmit = structuredClone(props.data)
  }
)

function verifyData() {
  if (!objectForEmit) return
  if (objectForEmit.name === '') {
    window.alert('The name input field cannot be empty')
  } else {
    sendData()
  }
}

function sendData() {
  if (!objectForEmit) return

  if (Object.keys(objectForEmit).includes('city_id')) {
    ;(objectForEmit as POI).city_id = selectedIdForCity.value
  }

  if (typeof objectForEmit.id === 'number') {
    objectForEmit.id = props.data?.id || 0
  }

  emit('sendData', objectForEmit)
  emit('close')
}
onMounted(async () => {
  if (props.typeString === 'POI') {
    await cityStore.getCities()
  }
})
</script>
