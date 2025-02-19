import {
  canUncouple,
  findEngine,
  getPanelsToCouple,
  getPanelsToUncouple,
} from 'src/libs/truckCoupling.js'
import { expect, test } from 'vitest'

// describe findEngine
test('finds the engine from tracks and returns the engine index and engine panel index', () => {
  const testTracks = [[{}, { isEngine: true }]]
  const testTracks2 = [[{}, {}], [], [{ isEngine: true }]]

  expect(findEngine(testTracks)).toStrictEqual({ track: 0, index: 1 })
  expect(findEngine(testTracks2)).toStrictEqual({ track: 2, index: 0 })
})

// describe getPanelsToCouple
test('returns an array of panels to couple to the engine', () => {
  const testTracks = [[{ isCoupled: false }, { isCoupled: false }, { isEngine: true }]]
  const testPanelPosition = { track: 0, index: 1 }
  const testEnginePosition = { track: 0, index: 2 }

  expect(getPanelsToCouple(testTracks, testPanelPosition, testEnginePosition)).toStrictEqual([
    { track: 0, index: 1 },
  ])

  const testTracks2 = [
    [{ isCoupled: false }, { isCoupled: false }],
    [{ isCoupled: false }],
    [{ isCoupled: false }, { isCoupled: false }, { isCoupled: false }, { isEngine: true }],
  ]
  const testPanelPosition2 = { track: 2, index: 0 }
  const testEnginePosition2 = { track: 2, index: 3 }
  expect(getPanelsToCouple(testTracks2, testPanelPosition2, testEnginePosition2)).toStrictEqual([
    { track: 2, index: 0 },
    { track: 2, index: 1 },
    { track: 2, index: 2 },
  ])
})

// describe canUncouple
test('returns true if truck can be uncoupled on track0', () => {
  const testPanelPosition = { track: 0, index: 4 }
  expect(canUncouple(testPanelPosition)).toBe(true)
})
test('returns true if truck can be uncoupled on track1', () => {
  const testPanelPosition = { track: 1, index: 2 }
  expect(canUncouple(testPanelPosition)).toBe(true)
})
test('returns false if truck can not be uncoupled on track2', () => {
  const testPanelPosition = { track: 2, index: 4 }
  expect(canUncouple(testPanelPosition)).toBe(false)
})

// describe getPanelsToUncouple
test('returns an array of panels to uncouple from the engine', () => {
  const testTracks = [[{ isCoupled: true }, { isCoupled: true }, { isEngine: true }]]
  const testPanelPosition = { track: 0, index: 1 }

  expect(getPanelsToUncouple(testTracks, testPanelPosition)).toStrictEqual([
    { track: 0, index: 0 },
    { track: 0, index: 1 },
  ])

  const testTracks2 = [
    [{ isCoupled: false }, { isCoupled: false }],
    [{ isCoupled: false }],
    [{ isCoupled: true }, { isCoupled: true }, { isCoupled: true }, { isEngine: true }],
  ]
  const testPanelPosition2 = { track: 2, index: 0 }
  expect(getPanelsToUncouple(testTracks2, testPanelPosition2)).toStrictEqual([
    { track: 2, index: 0 },
  ])
})
