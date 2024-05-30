<script setup>
import { ref } from 'vue'

const srcVarNew = ref('../public/github.svg')
const embedVal = ref(
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11071.353396173032!2d25.592018366704178!3d46.07426433744442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474b4a9995ca52bf%3A0x39ff071f5dc9ee5c!2s525100%20Bar%C3%B3t!5e0!3m2!1shu!2sro!4v1716968888645!5m2!1shu!2sro'
)
</script>

<template>
  <main class="flex flex-col justify-center items-center w-full">
    <!--   <iframe width="400px" height="400px" :src="embedVal"></iframe> -->
    <!--  <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22226.77535805463!2d25.769333731397566!3d45.86436839930041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b4a4be8c5e8aeb%3A0xaf63eed88e8253ee!2sSepsiszentgy%C3%B6rgy!5e0!3m2!1shu!2sro!4v1717013657286!5m2!1shu!2sro"
      width="600"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe> -->
    <!-- <img :src="srcVarNew" class="cursor-pointer w-3/12" /> -->
    <div class="flex justify-center items-center h-screen">
      <h1 class="text-[8vh]">City attractions for tourists</h1>
      <RouterLink to="/points">
        <img
          src="../../city-pointer.svg"
          width="300"
          class="drop-shadow-2xl duration-700 cursor-pointer hover:mb-20"
        />
      </RouterLink>
    </div>
    <div
      class="m-5 p-24 flex justify-center items-center h-screen bg-cyan-700 rounded-[250px] shadow-2xl"
    >
      <RouterLink to="/cities">
        <img src="../../school.svg" width="350" class="hover:drop-shadow-2xl" />
      </RouterLink>
      <h1 class="text-[7vh] text-white ml-9">Find your favorite place in your favorite city!</h1>
    </div>

    <div></div>
  </main>
</template>
