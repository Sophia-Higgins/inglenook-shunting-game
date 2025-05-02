<template>
  <div class="q-ma-lg row q-gutter-md">
    <q-btn color="purple" @click="emit('moveCoupledItemsLeft')" :disable="props.disableButtons">
      Left
    </q-btn>
    <q-btn color="purple" @click="emit('moveCoupledItemsRight')" :disable="props.disableButtons">
      Right
    </q-btn>
    <q-btn color="purple" @click="emit('reset')" :disable="props.disableButtons">
      Reset tracks
    </q-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  disableButtons: {
    type: Boolean,
  },
})
const emit = defineEmits(['reset', 'moveCoupledItemsLeft', 'moveCoupledItemsRight'])
</script>
