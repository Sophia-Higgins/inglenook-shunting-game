<template>
  <q-page class="row">
    <q-card style="width: 80vw" class="q-mx-auto">
      <ResultComponent />
      <RulesComponent />
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
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getTracks } from 'src/libs/createTracks'
import { findCoupledItems, getItemsToSwapLeft, getItemsToSwapRight } from 'src/libs/movePanels'
import { findEngine, getPanelsToCouple, getPanelsToUncouple } from 'src/libs/truckCoupling'
import ResultComponent from 'components/ResultComponent.vue'
import TracksComponent from 'components/TracksComponent.vue'
import ButtonsComponent from 'components/ButtonsComponent.vue'
import RulesComponent from 'src/components/RulesComponent.vue'

const tracks = ref([])
const disableButtons = ref(false)
const selectedTrack = ref('track0')

onMounted(() => {
  tracks.value = getTracks()
})

const reset = () => {
  tracks.value = getTracks()
}

const updateSelectedTrack = (value) => {
  selectedTrack.value = value
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
</script>
