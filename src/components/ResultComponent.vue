<template>
  <div class="q-ma-lg row q-px-auto">
    <p
      v-for="(item, index) in topRow"
      :key="index"
      class="flex bg-deep-purple-4 q-mx-sm justify-center items-center"
      style="height: 50px; width: 50px"
    >
      {{ item }}
    </p>
  </div>
  <div class="q-ma-lg row">
    <p
      v-for="(item, index) in bottomRow"
      :key="index"
      class="flex bg-deep-purple-4 q-mx-sm justify-center items-center"
      style="height: 50px; width: 50px"
    >
      {{ item }}
    </p>
  </div>
</template>

<script setup>
import { truckArray } from '../models/models.js'

const randomiseTruckArray = truckArray.sort(() => Math.random() - 0.5)

const topRow = randomiseTruckArray.slice(0, 5)
const bottomRow = randomiseTruckArray.slice(5, 8)
</script>
