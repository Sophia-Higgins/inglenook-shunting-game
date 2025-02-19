const track0JunctionIndex = 8

export const findCoupledItems = (tracks) => {
  const coupledItems = []
  tracks.forEach((track, trackIndex) => {
    track.forEach((panel, panelIndex) => {
      if (panel.isCoupled) {
        coupledItems.push({ track: trackIndex, index: panelIndex })
      }
    })
  })
  return coupledItems
}

const getTrack1JunctionIndex = (tracks) => {
  return tracks[1].length - 1
}

const getTrack2JunctionIndex = (tracks) => {
  return tracks[2].length - 1
}

export const getItemsToSwapLeft = (tracks, coupledItems, selectedTrack) => {
  const originalAndnewIndexPositions = []
  const track1JunctionIndex = getTrack1JunctionIndex(tracks)

  coupledItems.forEach((item) => {
    if (selectedTrack === 'track2' && item.track === 1 && item.index === track1JunctionIndex) {
      originalAndnewIndexPositions.push({
        originalTrack: item.track,
        originalIndex: item.index,
        newTrack: 2,
        newIndex: 6,
      })
    } else if (
      selectedTrack !== 'track0' &&
      item.track === 0 &&
      item.index === track0JunctionIndex
    ) {
      originalAndnewIndexPositions.push({
        originalTrack: item.track,
        originalIndex: item.index,
        newTrack: 1,
        newIndex: 7,
      })
    } else {
      originalAndnewIndexPositions.push({
        originalTrack: item.track,
        originalIndex: item.index,
        newTrack: item.track,
        newIndex: item.index - 1,
      })
    }
  })
  return originalAndnewIndexPositions
}

export const getItemsToSwapRight = (tracks, coupledItems) => {
  const originalAndnewIndexPositions = []
  const track1JunctionIndex = getTrack1JunctionIndex(tracks)
  const track2JunctionIndex = getTrack2JunctionIndex(tracks)

  coupledItems.forEach((item) => {
    if (item.track === 2 && item.index === track2JunctionIndex) {
      originalAndnewIndexPositions.push({
        originalTrack: item.track,
        originalIndex: item.index,
        newTrack: 1,
        newIndex: 7,
      })
    } else if (item.track === 1 && item.index === track1JunctionIndex) {
      originalAndnewIndexPositions.push({
        originalTrack: item.track,
        originalIndex: item.index,
        newTrack: 0,
        newIndex: 8,
      })
    } else {
      originalAndnewIndexPositions.push({
        originalTrack: item.track,
        originalIndex: item.index,
        newTrack: item.track,
        newIndex: item.index + 1,
      })
    }
  })
  return originalAndnewIndexPositions
}
