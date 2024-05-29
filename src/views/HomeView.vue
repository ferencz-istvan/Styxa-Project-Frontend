<script setup>
import { ref } from 'vue'

const srcVarNew = ref('../public/github.svg')
const embedVal = ref(
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11071.353396173032!2d25.592018366704178!3d46.07426433744442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474b4a9995ca52bf%3A0x39ff071f5dc9ee5c!2s525100%20Bar%C3%B3t!5e0!3m2!1shu!2sro!4v1716968888645!5m2!1shu!2sro'
)
</script>

<template>
  <main>
    <iframe width="400px" height="400px" :src="embedVal"></iframe>
    <img :src="srcVarNew" class="cursor-pointer w-3/12" />

    <img src="../../city-pointer.svg" width="300" />
  </main>
</template>
