<template>
  <div class="q-ma-lg row text-body1">{{ instructionsText }}</div>
  <div class="q-ml-lg row text-body1">{{ aimText }}</div>
  <div class="row justify-center">
    <q-btn label="Instructions" color="purple" class="q-mt-md" @click="openInstructions" />

    <q-dialog v-model="carousel" full-width @hide="resetCarousel">
      <q-carousel
        v-model="slide"
        arrows
        prev-icon="arrow_left"
        next-icon="arrow_right"
        swipeable
        animated
        control-color="purple"
        navigation
        height="500px"
        class="bg-white shadow-1 rounded-borders"
      >
        <template v-slot:navigation-icon="{ active, btnProps, onClick }">
          <q-btn
            v-if="active"
            size="lg"
            icon="train"
            color="purple"
            flat
            round
            dense
            @click="onClick"
          />
          <q-btn
            v-else
            size="sm"
            :icon="btnProps.icon"
            color="primary"
            flat
            round
            dense
            @click="onClick"
          />
        </template>
        <template v-slot:control>
          <q-carousel-control position="top-right" :offset="[18, 18]">
            <q-btn icon="close" color="purple" flat round dense v-close-popup />
          </q-carousel-control>
        </template>
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <div class="row no-wrap flex-center q-gutter-lg">
            <div class="col-4">
              <q-img class="rounded-borders" src="src/assets/Radio_snippets.png" />
            </div>
            <div class="q-mt-md col-6 text-h5">
              {{ instructionsSlideOne }}
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <div class="row no-wrap flex-center q-gutter-lg">
            <div class="col-4">
              <q-img class="rounded-borders" src="src/assets/Buttons_snippets.png" />
            </div>
            <div class="q-mt-md col-6 text-h5" style="white-space: pre-wrap">
              {{ instructionsSlideTwo }}
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center">
          <div class="row no-wrap flex-center q-gutter-lg">
            <div class="col-4">
              <q-img class="rounded-borders" src="src/assets/Coupled_cars_snippet.png" />
            </div>
            <div class="q-mt-md col-6 text-h5" style="white-space: pre-wrap">
              {{ instructionsSlideThree }}
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap flex-center">
          <div class="row no-wrap flex-center q-gutter-lg">
            <div class="col-4">
              <q-img class="rounded-borders" src="src/assets/Track_snippet.png" />
            </div>
            <div class="q-mt-md col-6 text-h5" style="white-space: pre-wrap">
              {{ instructionsSlideFour }}
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>
  </div>
</template>

<script setup>
import {
  instructionsText,
  aimText,
  instructionsSlideOne,
  instructionsSlideThree,
  instructionsSlideFour,
  instructionsSlideTwo,
} from 'src/libs/instructionsText'
import { ref } from 'vue'

const carousel = ref(false)
const slide = ref(1)

function openInstructions() {
  carousel.value = true
}

function resetCarousel() {
  slide.value = 1
}
</script>
