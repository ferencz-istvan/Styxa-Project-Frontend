<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-card text="Sziasztok, hogy vagytok? Örülök, hogy itt vagytok!" variant="tonal"></v-card>

    <v-row dense>
      <v-col v-for="(variant, i) in variants" :key="i" cols="12" md="4">
        <!-- @vue-ignore -->
        <v-card
          :variant="variant"
          class="mx-auto"
          color="surface-variant"
          max-width="344"
          subtitle="Greyhound divisely hello coldly fonwderfully"
          title="Headline"
        >
          <template v-slot:actions>
            <v-btn text="Button"></v-btn>
          </template>
        </v-card>

        <div class="text-center text-caption">{{ variant }}</div>
      </v-col>
    </v-row>

    <VuetifyComponent></VuetifyComponent>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import VuetifyComponent from '../components/VuetifyComponent.vue'
/* enum Variant {
  'elevated',
  'flat',
  'tonal',
  'outlined',
  'text',
  'plain'
} */
const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain']
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-items: center;
    justify-content: center;
    align-items: center;
  }
}
</style>
