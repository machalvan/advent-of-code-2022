require("../utils")()

const part1 = input => {
  return input
    .toLines()
    .map(line => line.split(",").map(pair => pair.split("-").toNumbers()))
    .reduce((res, line) => {
      const [range1, range2] = line.map(([start, end]) => range(start, end))
      return res + (range1.isSubsetOf(range2) || range2.isSubsetOf(range1))
    }, 0)
}

const part2 = input => {
  return input
    .toLines()
    .map(line => line.split(",").map(pair => pair.split("-").toNumbers()))
    .reduce((res, line) => {
      const [range1, range2] = line.map(([start, end]) => range(start, end))
      return res + !!range1.intersection(range2).length
    }, 0)
}

module.exports = { part1, part2 }
