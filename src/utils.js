export function countNonZeroProperties(obj) {
  let count = 0
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key].start > 0) {
      count++
    }
  }
  return count
}
