<template>
  <link
    href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
    rel="stylesheet"
  />
  <div class="body">
    <div class="normal-header">
      <div>
        <button @click="isSidebar = !isSidebar"><span class="mdi mdi-menu own-icon"></span></button>
      </div>
      <div><span class="mdi mdi-database-arrow-down own-icon"></span></div>
      <div><span class="mdi mdi-alien own-icon"></span></div>
      <div><h1>Alap fejléc</h1></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-if="isShowStickyHeader" class="sticky-header">
      <div>
        <button @click="isSidebar = !isSidebar"><span class="mdi mdi-menu own-icon"></span></button>
      </div>
      <div><span class="mdi mdi-database-arrow-down own-icon"></span></div>
      <div><span class="mdi mdi-alien own-icon"></span></div>
      <div><h1>Fejléc</h1></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="container">
      <div v-if="isSidebar" class="sidebar">
        <div class="sidebar-head">
          <h2>Sidebar</h2>
          <span class="mdi mdi-close-box own-close" @click="isSidebar = !isSidebar"></span>
        </div>

        <RouterLink to="/"><div class="sidebar-div">Home</div></RouterLink>
        <RouterLink to="/about"><div class="sidebar-div">About</div></RouterLink>
        <RouterLink to="/cities"><div class="sidebar-div">Cities</div></RouterLink>
        <RouterLink to="/points"><div class="sidebar-div">P.O.I.-s</div></RouterLink>
      </div>
      <div class="main-flow">
        <div class="text">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const showHeaderPosition = ref(100)
const isShowStickyHeader = ref(false)

function onScroll() {
  const scrollPosition = window.scrollY
  if (scrollPosition >= showHeaderPosition.value) {
    isShowStickyHeader.value = true
    /* console.log(valueForMargin.value) */
  } else {
    isShowStickyHeader.value = false
    /*   console.log(valueForMargin.value) */
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

/* const marginLeft = computed(isSidebar? 40px : 0px) */
const isSidebar = ref(true)

const valueForMargin = computed(() => {
  return isSidebar.value ? '250px' : '0'
})
</script>

<style>
.body {
  display: block;
  width: 100vw;
  min-height: 300vh;
  background-color: pink;
}
.container {
  display: flex;
}
.normal-header {
  display: grid;
  grid-template-columns: 60px 60px 60px 1fr 180px;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: cadetblue;
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
  display: grid;
  grid-template-columns: 60px 60px 60px 1fr 180px;
  margin: 10px 10px 10px 10px;
  width: 98%;
  height: 60px;
  background-color: rgba(127, 255, 212, 0.5);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: 2s all ease;
  /*filter: blur(4px);*/
  /*filter: drop-shadow(16px 16px 20px red) invert(75%);*/
}
.sticky-header > * {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-flow {
  position: static;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-left: v-bind(valueForMargin);
}
.text {
  text-align: justify;
  text-justify: inter-word;
  width: 70%;
  min-width: 800px;
}
.sidebar {
  position: fixed;
  left: 10px;
  top: 120px;
  background-color: cornflowerblue;
  width: 200px;
  min-height: 500px;
  padding: 15px;
  border-radius: 15px;
  opacity: 0.6;
}
.sidebar:hover {
  opacity: 1;
  width: 250px;
}
.sidebar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
</style>
