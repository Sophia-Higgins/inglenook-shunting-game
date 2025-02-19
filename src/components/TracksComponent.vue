<template>
  <div class="q-ma-lg row q-gutter-xs">
    <q-radio
      :model-value="selectedTrack"
      @update:model-value="() => emit('updateSelectedTrack', 'track0')"
      val="track0"
      size="xs"
      :disable="props.disableButtons"
    />
    <q-item
      v-for="(panel, index) in tracks[0]"
      :key="index"
      class="justify-center items-center"
      style="width: 40px; height: 40px"
      :class="{
        'bg-grey': panel.isEngine,
        'bg-deep-purple-4': panel.isTruck,
        'bg-yellow': panel.isCoupled,
        'bg-green-4': shouldHighlightTrack0Route(panel, index),
        'bg-green-2':
          !panel.isEngine &&
          !panel.isCoupled &&
          !panel.isTruck &&
          !shouldHighlightTrack0Route(panel, index),
      }"
      :clickable="!props.disableButtons"
      @click="emit('coupling', { track: 0, index })"
      tag="track0"
      >{{ panel.truck }}
    </q-item>
  </div>
  <div class="q-ma-lg q-ml-xl row q-gutter-xs">
    <q-radio
      :model-value="selectedTrack"
      @update:model-value="() => emit('updateSelectedTrack', 'track1')"
      val="track1"
      size="xs"
      :disable="props.disableButtons"
    />
    <q-item
      v-for="(panel, index) in tracks[1]"
      :key="index"
      class="justify-center items-center"
      style="width: 40px; height: 40px"
      :class="{
        'bg-grey': panel.isEngine,
        'bg-deep-purple-4': panel.isTruck,
        'bg-yellow': panel.isCoupled,
        'bg-green-4': shouldHighlightTrack1Route(panel, index),
        'bg-green-2':
          !panel.isEngine &&
          !panel.isCoupled &&
          !panel.isTruck &&
          !shouldHighlightTrack1Route(panel, index),
      }"
      :clickable="!props.disableButtons"
      @click="emit('coupling', { track: 1, index })"
      tag="track1"
      >{{ panel.truck }}
    </q-item>
  </div>
  <div class="q-ma-lg q-ml-xl row q-gutter-xs">
    <q-radio
      :model-value="selectedTrack"
      @update:model-value="() => emit('updateSelectedTrack', 'track2')"
      val="track2"
      size="xs"
      class="q-ml-md"
      :disable="props.disableButtons"
    />
    <q-item
      v-for="(panel, index) in tracks[2]"
      :key="index"
      class="justify-center items-center"
      style="width: 40px; height: 40px"
      :class="{
        'bg-grey': panel.isEngine,
        'bg-deep-purple-4': panel.isTruck,
        'bg-yellow': panel.isCoupled,
        'bg-green-4': shouldHighlightTrack2Route(panel, index),
        'bg-green-2':
          !panel.isEngine &&
          !panel.isCoupled &&
          !panel.isTruck &&
          !shouldHighlightTrack2Route(panel, index),
      }"
      :clickable="!props.disableButtons"
      @click="emit('coupling', { track: 2, index })"
      tag="track2"
      >{{ panel.truck }}
    </q-item>
  </div>
</template>

<script setup>
const props = defineProps({
  tracks: {
    type: Array,
  },
  selectedTrack: {
    type: String,
  },
  disableButtons: {
    type: Boolean,
  },
})

const emit = defineEmits(['coupling', 'updateSelectedTrack'])

function shouldHighlightTrack0Route(panel, index) {
  if (props.selectedTrack === 'track0' && !panel.isEngine && !panel.isTruck) {
    return true
  } else if (props.selectedTrack !== 'track0' && !panel.isEngine && !panel.isTruck && index > 7) {
    return true
  } else {
    return false
  }
}

function shouldHighlightTrack1Route(panel, index) {
  if (props.selectedTrack === 'track1' && !panel.isEngine && !panel.isTruck) {
    return true
  } else if (props.selectedTrack === 'track2' && !panel.isEngine && !panel.isTruck && index > 6) {
    return true
  } else {
    return false
  }
}

function shouldHighlightTrack2Route(panel) {
  if (props.selectedTrack === 'track2' && !panel.isEngine && !panel.isTruck) {
    return true
  } else {
    return false
  }
}
</script>
