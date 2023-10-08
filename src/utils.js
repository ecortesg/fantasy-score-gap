export function roundNumber(number, decimals) {
  let powerOfTen = Math.pow(10, decimals);
  let result = Math.round(number * powerOfTen) / powerOfTen;
  return result;
}

export function countNonZeroProperties(obj) {
  let count = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] > 0) {
      count++;
    }
  }
  return count;
}
