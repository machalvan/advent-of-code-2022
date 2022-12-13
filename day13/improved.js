require("../utils")()

const compare = (aList, bList) => {
  let a = aList.shift()
  let b = bList.shift()

  if (a === undefined && b === undefined) {
    return 0
  } else if (a === undefined) {
    return 1
  } else if (b === undefined) {
    return -1
  }

  if (typeof a === "number" && typeof b === "number") {
    if (a > b) {
      return -1
    } else if (a < b) {
      return 1
    }
  } else if (typeof a === "number" && typeof b === "object") {
    return compare([a], b)
  } else if (typeof a === "object" && typeof b === "number") {
    return compare(a, [b])
  } else {
    const res = compare(a, b)
    if (res !== 0) return res
  }

  return compare(aList, bList)
}

const part1 = input => {
  return input
    .toBlocks()
    .reduce(
      (indices, [left, right], i) =>
        compare(eval(left), eval(right)) === 1
          ? indices.concat(i + 1)
          : indices,
      []
    )
    .sum()
}

const part2 = input => {
  const sorted = input
    .concat(
      `
[[2]]
[[6]]`
    )
    .toLines()
    .filter(line => line !== "")
    .sort((a, b) => compare(eval(b), eval(a)))

  return (sorted.indexOf("[[2]]") + 1) * (sorted.indexOf("[[6]]") + 1)
}

module.exports = { part1, part2 }
