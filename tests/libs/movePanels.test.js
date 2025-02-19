import { findCoupledItems, getItemsToSwapLeft, getItemsToSwapRight } from 'src/libs/movePanels.js'
import { expect, test } from 'vitest'

// describe findCoupledItems
test('finds the coupled items from tracks and returns the track index and index index', () => {
  const testTracks = [[{}, { isCoupled: true }, { isCoupled: true }]]
  const testTracks2 = [[{}, {}], [], [{ isCoupled: true }]]

  expect(findCoupledItems(testTracks)).toStrictEqual([
    { track: 0, index: 1 },
    { track: 0, index: 2 },
  ])
  expect(findCoupledItems(testTracks2)).toStrictEqual([{ track: 2, index: 0 }])
})

const tracksForTesting = [
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}],
]

// describe getItemsToSwapLeft
test('given current item is on the track1JunctionIndex and selectedTrack is track2 it returns the original index and the new index to the left, which will be the track2JunctionIndex', () => {
  const testCoupledItems = [{ track: 1, index: 7 }]
  const testSelectedTrack = 'track2'
  expect(getItemsToSwapLeft(tracksForTesting, testCoupledItems, testSelectedTrack)).toStrictEqual([
    {
      originalTrack: 1,
      originalIndex: 7,
      newTrack: 2,
      newIndex: 6,
    },
  ])
})
test('given current item is on the track0JunctionIndex and selectedTrack is track1 it returns the original index and the new index to the left, which will be the track1JunctionIndex', () => {
  const testCoupledItems = [{ track: 0, index: 8 }]
  const testSelectedTrack = 'track1'
  expect(getItemsToSwapLeft(tracksForTesting, testCoupledItems, testSelectedTrack)).toStrictEqual([
    {
      originalTrack: 0,
      originalIndex: 8,
      newTrack: 1,
      newIndex: 7,
    },
  ])
})
test('given current item is on the track0JunctionIndex and selectedTrack is track2 it returns the original index and the new index to the left, which will be the track1JunctionIndex', () => {
  const testCoupledItems = [{ track: 0, index: 8 }]
  const testSelectedTrack = 'track2'
  expect(getItemsToSwapLeft(tracksForTesting, testCoupledItems, testSelectedTrack)).toStrictEqual([
    {
      originalTrack: 0,
      originalIndex: 8,
      newTrack: 1,
      newIndex: 7,
    },
  ])
})
test('given current item is not on the track0JunctionIndex and selectedTrack is track0 it returns the original index and the new index to the left', () => {
  const testCoupledItems = [{ track: 0, index: 6 }]
  const testSelectedTrack = 'track0'
  expect(getItemsToSwapLeft(tracksForTesting, testCoupledItems, testSelectedTrack)).toStrictEqual([
    {
      originalTrack: 0,
      originalIndex: 6,
      newTrack: 0,
      newIndex: 5,
    },
  ])
})
test('creates an array with original and new positions for moving coupled items left', () => {
  const testCoupledItems = [
    { track: 2, index: 6 },
    { track: 1, index: 7 },
    { track: 0, index: 8 },
  ]
  const testSelectedTrack = 'track2'
  expect(getItemsToSwapLeft(tracksForTesting, testCoupledItems, testSelectedTrack)).toStrictEqual([
    {
      originalTrack: 2,
      originalIndex: 6,
      newTrack: 2,
      newIndex: 5,
    },
    {
      originalTrack: 1,
      originalIndex: 7,
      newTrack: 2,
      newIndex: 6,
    },
    {
      originalTrack: 0,
      originalIndex: 8,
      newTrack: 1,
      newIndex: 7,
    },
  ])
})

// describe getItemsToSwapRight
test('returns newTrack of 1 and newIndex of 7 if current track index is 2 and current index index is 6', () => {
  const testCoupledItems = [{ track: 2, index: 6 }]
  expect(getItemsToSwapRight(tracksForTesting, testCoupledItems)).toStrictEqual([
    {
      originalTrack: 2,
      originalIndex: 6,
      newTrack: 1,
      newIndex: 7,
    },
  ])
})
test('returns newTrack of 0 and newIndex of 8 if current track index is 1 and current index index is 7', () => {
  const testCoupledItems = [{ track: 1, index: 7 }]
  expect(getItemsToSwapRight(tracksForTesting, testCoupledItems)).toStrictEqual([
    {
      originalTrack: 1,
      originalIndex: 7,
      newTrack: 0,
      newIndex: 8,
    },
  ])
})
test('returns newTrack of 0 and newIndex of 5 if current track index is 0 and current index index is 4', () => {
  const testCoupledItems = [{ track: 0, index: 4 }]
  expect(getItemsToSwapRight(tracksForTesting, testCoupledItems)).toStrictEqual([
    {
      originalTrack: 0,
      originalIndex: 4,
      newTrack: 0,
      newIndex: 5,
    },
  ])
})
test('creates an array with original and new positions for moving coupled items left', () => {
  const testCoupledItems = [
    { track: 0, index: 8 },
    { track: 1, index: 7 },
    { track: 2, index: 6 },
  ]
  expect(getItemsToSwapRight(tracksForTesting, testCoupledItems)).toStrictEqual([
    {
      originalTrack: 0,
      originalIndex: 8,
      newTrack: 0,
      newIndex: 9,
    },
    {
      originalTrack: 1,
      originalIndex: 7,
      newTrack: 0,
      newIndex: 8,
    },
    {
      originalTrack: 2,
      originalIndex: 6,
      newTrack: 1,
      newIndex: 7,
    },
  ])
})
