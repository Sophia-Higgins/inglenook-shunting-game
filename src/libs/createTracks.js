import { panel } from '../models/models.js'

export const createTrack0 = () => {
  const panelArray = []
  panelArray.push({
    ...panel,
    truck: 'A',
    isTruck: true,
    trackRoute: ['track0'],
  })
  panelArray.push({
    ...panel,
    truck: 'B',
    isTruck: true,
    trackRoute: ['track0'],
  })
  panelArray.push({
    ...panel,
    truck: 'C',
    isTruck: true,
    trackRoute: ['track0'],
  })
  panelArray.push({
    ...panel,
    truck: 'D',
    isTruck: true,
    trackRoute: ['track0'],
  })
  panelArray.push({
    ...panel,
    truck: 'E',
    isTruck: true,
    trackRoute: ['track0'],
  })
  for (let i = 0; i < 3; i++) {
    panelArray.push({
      ...panel,
      trackRoute: ['track0'],
    })
  }
  for (let i = 0; i < 6; i++) {
    panelArray.push({
      ...panel,
      trackRoute: ['track0', 'track1', 'track2'],
    })
  }
  panelArray.push({
    truck: 'ENG',
    isEngine: true,
    isCoupled: true,
    trackRoute: ['track0', 'track1', 'track2'],
  })

  return panelArray
}

export const createtrack1 = () => {
  const panelArray = []
  panelArray.push({
    ...panel,
    truck: 'F',
    isTruck: true,
    trackRoute: ['track1'],
  })
  panelArray.push({
    ...panel,
    truck: 'G',
    isTruck: true,
    trackRoute: ['track1'],
  })
  panelArray.push({
    ...panel,
    truck: 'H',
    isTruck: true,
    trackRoute: ['track1'],
  })
  for (let i = 0; i < 4; i++) {
    panelArray.push({
      ...panel,
      trackRoute: ['track1'],
    })
  }
  panelArray.push({
    ...panel,
    trackRoute: ['track1', 'track2'],
  })
  return panelArray
}

export const createTrack2 = () => {
  const panelArray = []
  for (let i = 0; i < 7; i++) {
    panelArray.push({
      ...panel,
      trackRoute: ['track2'],
    })
  }
  return panelArray
}

export const getTracks = () => {
  return [createTrack0(), createtrack1(), createTrack2()]
}
