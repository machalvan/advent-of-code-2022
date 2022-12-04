const { readFileSync } = require("fs")
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

const input = readFileSync("input.txt", "utf8").trim()
console.log(part1(input))
console.log(part2(input))
