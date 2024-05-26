<template>
  <div class="main">
    <div v-if="isSidebar" id="sideBarAndBlur">
      <div id="aside">
        <button id="sideButton" @click="isSidebar = !isSidebar">Side-Bar</button>
        <div id="sideContent">
          <p>Home</p>
          <p>About</p>
          <p>Connection</p>
        </div>
      </div>
      <div id="blur" @click="isSidebar = !isSidebar"></div>
    </div>
    <div id="static">
      <header>
        <button @click="isSidebar = !isSidebar">Close</button>
        hello
      </header>

      <p>halika hahaha</p>
      <div>
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
        an unknown printer took a galley of type and scrambled it to make a type specimen book. It
        has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a
        long established fact that a reader will be distracted by the readable content of a page
        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
        normal distribution of letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web page editors now use
        Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many
        web sites still in their infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </div>
      <br />
      <br />
      <div>
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
        an unknown printer took a galley of type and scrambled it to make a type specimen book. It
        has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a
        long established fact that a reader will be distracted by the readable content of a page
        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
        normal distribution of letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web page editors now use
        Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many
        web sites still in their infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </div>
      <br />
      <br />
      <div>
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
        an unknown printer took a galley of type and scrambled it to make a type specimen book. It
        has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a
        long established fact that a reader will be distracted by the readable content of a page
        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
        normal distribution of letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web page editors now use
        Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many
        web sites still in their infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </div>
      <br />
      <br />
      <div>
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
        an unknown printer took a galley of type and scrambled it to make a type specimen book. It
        has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a
        long established fact that a reader will be distracted by the readable content of a page
        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
        normal distribution of letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web page editors now use
        Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many
        web sites still in their infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </div>
      <br />
      <br />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
const isSidebar = ref(false)
const bgColor = ref('cadetblue')
const overflow = isSidebar.value === true ? 'hidden' : 'auto'
/* watch(isSidebar, () => {
  isSidebar.value === true ? overflow.value ='hidden' : overflow.value='auto'
}) */
</script>

<style>
html {
  overflow: v-bind(overflow);
}
.main {
  /*position: relative;*/
  width: 100vw;
  background-color: v-bind(bgColor);
}
p {
  color: white;
}
header {
  position: sticky;
  top: 0%;
  height: 10vh;
  background-color: antiquewhite;
  display: flex;
  align-items: center;
}
button {
  margin: 12px;
  padding: 10px;
  border-radius: 15px;
  background-color: white;
}
#static {
  z-index: 0;
  position: relative;
}
#sideBarAndBlur {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: transparent;
}
#aside {
  background-color: blue;
  height: 100vh;
  width: 30vw;
  border-radius: 0% 20px 20px 00%;
  display: flex;
  flex-direction: column;
}
#sideButton {
  background-color: lime;
  width: 100px;
  margin-left: 20px;
}
#blur {
  width: 100%;
  height: 100vh;
  background-color: transparent;
  backdrop-filter: blur(5px);
}
#sideContent {
  margin-left: 45px;
  font-size: large;
  line-height: 40px;
}
</style>
