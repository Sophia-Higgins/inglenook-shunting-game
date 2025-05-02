<template>
  <q-page class="row">
    <q-card style="width: 80vw" class="q-mx-auto">
      <RulesComponent />
      <ResultComponent :top-row="topRow" :bottom-row="bottomRow" />
      <TracksComponent
        :tracks="tracks"
        :disable-buttons="disableButtons"
        :selected-track="selectedTrack"
        @coupling="coupling"
        @update-selected-track="updateSelectedTrack"
      />
      <ButtonsComponent
        :disable-buttons="disableButtons"
        @reset="reset"
        @move-coupled-items-left="moveCoupledItemsLeft"
        @move-coupled-items-right="moveCoupledItemsRight"
      />
    </q-card>
    <q-dialog v-model="successMessage">
      <q-card>
        <q-card-section>
          <div class="text-h6">You did it!</div>
        </q-card-section>

        <q-card-section>
          <q-icon color="purple" name="celebration" size="200px" class="q-ma-xl" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="resetAll" flat label="Play again" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { getTracks } from '../libs/createTracks.js'
import { findCoupledItems, getItemsToSwapLeft, getItemsToSwapRight } from '../libs/movePanels.js'
import { findEngine, getPanelsToCouple, getPanelsToUncouple } from '../libs/truckCoupling.js'
import ResultComponent from '../components/ResultComponent.vue'
import TracksComponent from '../components/TracksComponent.vue'
import ButtonsComponent from '../components/ButtonsComponent.vue'
import RulesComponent from '../components/RulesComponent.vue'
import { truckArray } from '../models/models.js'

const tracks = ref([])
const disableButtons = ref(false)
const selectedTrack = ref('track0')
const successMessage = ref(false)
const topRow = ref([])
const bottomRow = ref([])

onMounted(() => {
  // window.addEventListener('keydown', handleKeyDown)
  resetAll()
})

const reset = () => {
  tracks.value = getTracks()
}

const updateSelectedTrack = (value) => {
  selectedTrack.value = value
}

const resetAll = () => {
  const randomiseTruckArray = truckArray.sort(() => Math.random() - 0.5)
  topRow.value = randomiseTruckArray.slice(0, 5)
  bottomRow.value = randomiseTruckArray.slice(5, 8)
  tracks.value = getTracks()
}

const moveCoupledItemsLeft = () => {
  disableButtons.value = true

  const coupledItems = findCoupledItems(tracks.value)

  const orderedCoupledItems = coupledItems.sort((a, b) => b.track - a.track)

  const itemsToSwap = getItemsToSwapLeft(tracks.value, orderedCoupledItems, selectedTrack.value)

  if (itemsToSwap[0].newIndex < 0) {
    disableButtons.value = false
    return
  }

  const truckToLeftOfCoupledItems = tracks.value[itemsToSwap[0].newTrack][itemsToSwap[0].newIndex]
    .truck
    ? true
    : false

  if (!truckToLeftOfCoupledItems) {
    itemsToSwap.forEach((item) => {
      ;[
        tracks.value[item.originalTrack][item.originalIndex],
        tracks.value[item.newTrack][item.newIndex],
      ] = [
        tracks.value[item.newTrack][item.newIndex],
        tracks.value[item.originalTrack][item.originalIndex],
      ]
    })
    setTimeout(() => {
      moveCoupledItemsLeft()
    }, 300)
  } else {
    disableButtons.value = false
    return
  }
}

const moveCoupledItemsRight = () => {
  disableButtons.value = true

  const coupledItems = findCoupledItems(tracks.value)
  const orderedCoupledItems = coupledItems.sort((a, b) => b.index - a.index)

  const itemsToSwap = getItemsToSwapRight(tracks.value, orderedCoupledItems)

  if (itemsToSwap[0].newIndex >= tracks.value[itemsToSwap[0].newTrack].length) {
    disableButtons.value = false
    return
  }

  if (itemsToSwap[itemsToSwap.length - 1].newIndex < tracks.value[0].length) {
    itemsToSwap.forEach((item) => {
      ;[
        tracks.value[item.originalTrack][item.originalIndex],
        tracks.value[item.newTrack][item.newIndex],
      ] = [
        tracks.value[item.newTrack][item.newIndex],
        tracks.value[item.originalTrack][item.originalIndex],
      ]
    })
    setTimeout(() => {
      moveCoupledItemsRight()
    }, 300)
  } else {
    disableButtons.value = false
    return
  }
}

const coupling = (panelPosition) => {
  const enginePosition = findEngine(tracks.value)

  const panelsToCouple = getPanelsToCouple(tracks.value, panelPosition, enginePosition)
  const panelsToUncouple = getPanelsToUncouple(tracks.value, panelPosition)

  if (
    panelPosition.index > enginePosition.index - 4 &&
    panelPosition.index < enginePosition.index
  ) {
    const panelsToUpdate = panelsToCouple.length ? panelsToCouple : panelsToUncouple
    for (const panelPosition of panelsToUpdate) {
      ;[tracks.value[panelPosition.track][panelPosition.index]] = [
        {
          ...tracks.value[panelPosition.track][panelPosition.index],
          isCoupled: !tracks.value[panelPosition.track][panelPosition.index].isCoupled,
        },
      ]
    }
  }
}

watch(
  tracks.value,
  (newValue) => {
    const topTrack = newValue[0]
    const secondTrack = newValue[1]

    if (topTrack[topTrack.length - 1].truck !== 'ENG') {
      successMessage.value = false
      return
    }

    for (let i = 0; i < 5; i++) {
      if (topTrack[i].truck !== topRow[i]) {
        successMessage.value = false
        return
      }
    }

    for (let i = 0; i < 3; i++) {
      if (secondTrack[i].truck !== bottomRow[i]) {
        successMessage.value = false
        return
      }
    }

    successMessage.value = true
  },
  { deep: true },
)
</script>
