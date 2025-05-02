<template>
  <div class="q-mx-lg q-mt-lg row justify-center">
    <p
      v-for="(item, index) in props.topRow"
      :key="index"
      class="flex bg-deep-purple-4 q-mx-sm justify-center items-center"
      style="height: 50px; width: 50px"
    >
      {{ item }}
    </p>
  </div>
  <div class="q-mx-lg row justify-center">
    <p
      v-for="(item, index) in props.bottomRow"
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
const props = defineProps({
  topRow: {
    type: Array,
  },
  bottomRow: {
    type: Array,
  },
})
</script>
