export function countNonZeroProperties(obj) {
  let count = 0
  for (let key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      obj[key].start > 0 &&
      obj[key].start <= obj[key].end
    ) {
      count++
    }
  }
  return count
}

export function roundToSixDecimals(value) {
  return Math.round(value * 1e6) / 1e6
}
