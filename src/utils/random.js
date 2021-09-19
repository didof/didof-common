export function randomIntIncluded(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomColor() {
  const colors = [
    'aliceblue',
    'thistle',
    'antiquewhite',
    'whitesmoke',
    'wheat',
    'slategrey',
  ]

  const r = randomIntIncluded(0, colors.length)
  return colors[r]
}
