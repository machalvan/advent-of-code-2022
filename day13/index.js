require("../utils")()

const parse = list => {
  if (list === "[]") return []
  if (list[0] !== "[") return parseInt(list)

  const content = list.slice(1, list.length - 1)

  const stack = []
  const newList = []
  let substring = ""

  for (let i = 0; i < content.length; i++) {
    const item = content[i]
    substring += item

    if (item === "[") {
      stack.push(item)
    } else if (item === "]") {
      stack.pop()
    }

    if (stack.length === 0 && item === ",") {
      newList.push(substring.slice(0, -1))
      substring = ""
    }
  }

  newList.push(substring)

  return newList.map(item => parse(item))
}

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
    } else {
      return compare(aList, bList)
    }
  } else if (typeof a === "number" && typeof b === "object") {
    return compare([a], b)
  } else if (typeof a === "object" && typeof b === "number") {
    return compare(a, [b])
  } else {
    const res = compare(a, b)
    return res === 0 ? compare(aList, bList) : res
  }
}

const part1 = input => {
  return input
    .toBlocks()
    .reduce(
      (indices, [left, right], i) =>
        compare(parse(left), parse(right)) === 1
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
    .filter(l => l !== "")
    .sort((a, b) => compare(parse(a), parse(b)))
    .reverse()

  return [sorted.indexOf("[[2]]") + 1, sorted.indexOf("[[6]]") + 1].prod()
}

module.exports = { part1, part2 }
