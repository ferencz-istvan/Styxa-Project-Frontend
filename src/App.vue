<template>
  <link
    href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
    rel="stylesheet"
  />
  <div class="body">
    <div class="normal-header">
      <div>
        <button @click="isSidebar = !isSidebar">
          <Bars3Icon class="size-8 text-black cursor-pointer hover:drop-shadow-lg" />
        </button>
      </div>
      <div><img src="../public/github.svg" class="w-8 hover:drop-shadow-lg" /></div>
      <div><img class="cursor-pointer w-10 hover:drop-shadow-lg" src="../../favicon.svg" /></div>
      <div><h1>Cities with points of interests</h1></div>
      <div>
        <a href="https://styxa.ro/" target="_blank">
          <img
            class="cursor-pointer hover:drop-shadow-xl"
            src="../../styxa-white.png"
            width="45px"
          />
        </a>
      </div>
    </div>
    <div v-if="isShowStickyHeader" class="sticky-header">
      <div>
        <button @click="isSidebar = !isSidebar"><span class="mdi mdi-menu own-icon"></span></button>
      </div>
      <div><img src="../public/github.svg" class="w-8 hover:drop-shadow-lg" /></div>
      <div><img class="cursor-pointer w-10" src="../../bridge.svg" /></div>
      <div><h1>Cities & Points</h1></div>
      <div>
        <a href="https://styxa.ro/" target="_blank">
          <img class="cursor-pointer" src="../../styxa-blue.png" width="55px" />
        </a>
      </div>
    </div>

    <div v-if="isSidebar" class="sidebar">
      <div class="sidebar-head">
        <h1>Navigation</h1>
        <span class="mdi mdi-close-box own-close" @click="isSidebar = !isSidebar"></span>
      </div>

      <div class="w-full px-4 py-5">
        <div class="mx-auto w-full max-w-md">
          <RadioGroup v-model="selected">
            <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
            <div class="space-y-2">
              <div v-for="plan in plans" :key="plan.name">
                <RouterLink :to="plan.route">
                  <RadioGroupOption as="template" :value="plan" v-slot="{ active, checked }">
                    <div
                      :class="[
                        active ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300' : '',
                        checked ? 'bg-sky-900/75 text-white ' : 'bg-white '
                      ]"
                      class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
                    >
                      <div class="flex w-full items-center justify-between">
                        <div class="flex items-center">
                          <div class="text-sm">
                            <RadioGroupLabel
                              as="p"
                              :class="checked ? 'text-white' : 'text-gray-900'"
                              class="font-semibold"
                            >
                              {{ plan.name }}
                            </RadioGroupLabel>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroupOption>
                </RouterLink>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div class="flex justify-center">
        <img class="cursor-pointer w-6/12" src="../../coffee.svg" />
      </div>
    </div>

    <div class="main-flow">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { Bars3Icon } from '@heroicons/vue/24/solid'
import router from './router'

const plans = [
  {
    name: 'Home',
    route: '/'
  },
  {
    name: 'Cities',
    route: '/cities'
  },
  {
    name: 'Points',
    route: '/points'
  },
  {
    name: 'About me',
    route: '/about'
  }
]

const selected = ref(plans.find((element) => element.route === router.currentRoute.value.path))

watch(router.currentRoute, () => {
  selected.value = plans.find((element) => element.route === router.currentRoute.value.path)
})

/* const selectedValue = computed(()=>)   plans[i].route===router.currentRoute.value.path */

const showHeaderPosition = ref(100)
const isShowStickyHeader = ref(false)

function onScroll() {
  const scrollPosition = window.scrollY
  if (scrollPosition >= showHeaderPosition.value) {
    isShowStickyHeader.value = true
  } else {
    isShowStickyHeader.value = false
  }
}

const isSidebar = ref(true)

const valueForMargin = computed(() => {
  return isSidebar.value ? '300px' : '60'
})

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style>
:root {
  font-size: 16px;
}
.body {
  width: 100%;
  min-height: 100vh;
  background-color: Lavender;
}
.normal-header {
  display: grid;
  grid-template-columns: 60px 60px 60px 1fr 180px;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: DarkCyan;
  font-weight: 900;
  font-size: large;
  color: white;
}
.normal-header > * {
  display: flex;
  justify-content: center;
  align-items: first baseline;
}
.sticky-header {
  font-weight: 700;
  font-size: large;
  display: grid;
  grid-template-columns: 60px 60px 60px 1fr 180px;
  margin: 0px 0px 10px 0px;
  width: 100%;
  height: 60px;
  background-color: rgba(127, 255, 212, 0.5);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  /*filter: drop-shadow(16px 16px 20px red) invert(75%);*/
}
.sticky-header > * {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*padding: 20px 5vw;*/
  margin-left: v-bind(valueForMargin);
}
.sidebar {
  position: fixed;
  left: 10px;
  top: 100px;
  background-color: cornflowerblue;
  width: 250px;
  min-height: 500px;
  padding: 15px;
  border-radius: 15px;
  opacity: 0.8;
}
.sidebar:hover {
  opacity: 1;
  width: 250px;
}
.sidebar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: larger;
  font-weight: 700;
  margin-left: 20px;
  color: black;
}
.sidebar-div {
  margin: 10px;
  padding: 5px;
  background-color: darkslateblue;
  font-weight: bold;
}
.sidebar-div:hover {
  background-color: black;
  color: white;
}
.own-icon {
  color: black;
  font-size: xx-large;
  padding: 10px;
  cursor: pointer;
}
.own-icon:hover {
  filter: drop-shadow(8px 8px 8px white);
  color: blue;
  transition: 1s;
}
.own-close {
  color: black;
  font-size: x-large;
  padding: 10px;
  cursor: pointer;
}
.own-close:hover {
  filter: drop-shadow(2px 2px 4px white);
  color: darkred;
  transition: 0, 5s;
}
@media only screen and (max-width: 400px) {
  .sidebar {
    width: 100%;
    height: 100%;
    z-index: 100;
    opacity: 1;
  }
}
</style>
