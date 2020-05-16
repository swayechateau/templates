function getSavedState (key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveState (key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

export { getSavedState, saveState }
