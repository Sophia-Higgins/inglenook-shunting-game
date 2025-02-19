import { createTrack0, createtrack1, createTrack2 } from 'src/libs/createTracks.js'
import { expect, test } from 'vitest'

test('creates correct number of panels in top track', () => {
  expect(createTrack0().length).toBe(15)
})
test('creates the engine in the last panel in the top track', () => {
  const result = createTrack0()
  expect(result[result.length - 1].isEngine).toBe(true)
})

test('creates correct number of panels in the second track', () => {
  expect(createtrack1().length).toBe(8)
})

test('creates correct number of panels in the third track', () => {
  expect(createTrack2().length).toBe(7)
})
