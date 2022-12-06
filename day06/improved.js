require("../utils")()

const part1 = input => {
  return input
    .split("")
    .reduce(
      (res, _, i, arr) => res || (new Set(arr.slice(i - 4, i)).size === 4 && i),
      0
    )
}

const part2 = input => {
  return input
    .split("")
    .reduce(
      (res, _, i, arr) =>
        res || (new Set(arr.slice(i - 14, i)).size === 14 && i),
      0
    )
}

module.exports = { part1, part2 }
