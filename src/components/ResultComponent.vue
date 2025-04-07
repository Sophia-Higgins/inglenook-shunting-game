<template>
  <div class="q-mx-lg q-mt-lg row justify-center">
    <p
      v-for="(item, index) in topRow"
      :key="index"
      class="flex bg-deep-purple-4 q-mx-sm justify-center items-center"
      style="height: 50px; width: 50px"
    >
      {{ item }}
    </p>
  </div>
  <div class="q-mx-lg row justify-center">
    <p
      v-for="(item, index) in bottomRow"
      :key="index"
      class="flex bg-deep-purple-4 q-mx-sm justify-center items-center"
      style="height: 50px; width: 50px"
    >
      {{ item }}
    </p>
    <div class="flex q-mx-sm justify-center items-center" style="height: 50px; width: 50px" />
    <div class="flex q-mx-sm justify-center items-center" style="height: 50px; width: 50px" />
  </div>
</template>

<script setup>
import { truckArray } from '../models/models.js'

const randomiseTruckArray = truckArray.sort(() => Math.random() - 0.5)

const topRow = randomiseTruckArray.slice(0, 5)
const bottomRow = randomiseTruckArray.slice(5, 8)
</script>
