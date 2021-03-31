export function addToLS (key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getFromLS (key) {
  return JSON.parse(localStorage.getItem(key))
}
