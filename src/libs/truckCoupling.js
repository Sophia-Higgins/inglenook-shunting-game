export const findEngine = (tracks) => {
  let engineTrack
  let enginePanel
  tracks.forEach((track, trackIndex) => {
    track.find((panel, panelIndex) => {
      if (panel.isEngine) {
        engineTrack = trackIndex
        enginePanel = panelIndex
      }
    })
  })

  return { track: engineTrack, index: enginePanel }
}

export const getPanelsToCouple = (tracks, panelPosition, enginePosition) => {
  const panelIndexToCouple = []

  for (let i = panelPosition.index; i < enginePosition.index; i++) {
    if (!tracks[panelPosition.track][i].isCoupled) {
      panelIndexToCouple.push({ track: panelPosition.track, index: i })
    }
  }
  return panelIndexToCouple
}

export const canUncouple = (panelPosition) => {
  const availableCouplingPositionsOnTrack0 = panelPosition.track === 0 && panelPosition.index < 5
  const availableCouplingPositionsOnOtherTracks =
    panelPosition.track !== 0 && panelPosition.index < 3
  if (availableCouplingPositionsOnTrack0 || availableCouplingPositionsOnOtherTracks) {
    return true
  } else {
    return false
  }
}

export const getPanelsToUncouple = (tracks, panelPosition) => {
  const panelIndexToUncouple = []

  for (let i = 0; i <= panelPosition.index; i++) {
    if (tracks[panelPosition.track][i].isCoupled && canUncouple(panelPosition)) {
      panelIndexToUncouple.push({ track: panelPosition.track, index: i })
    }
  }
  return panelIndexToUncouple
}
