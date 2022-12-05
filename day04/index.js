require("../utils")()

const part1 = input => {
  return input
    .toLines()
    .map(line => line.split(",").map(pair => pair.split("-").toNumbers()))
    .reduce((res, line) => {
      const [range1, range2] = line.map(([start, end]) => {
        let range = []
        for (let i = start; i <= end; i++) {
          range.push(i)
        }
        return range
      })

      if (range1.isSubsetOf(range2) || range2.isSubsetOf(range1)) {
        res++
      }

      return res
    }, 0)
}

const part2 = input => {
  return input
    .toLines()
    .map(line => line.split(",").map(pair => pair.split("-").toNumbers()))
    .reduce((res, line) => {
      const [range1, range2] = line.map(([start, end]) => {
        let range = []
        for (let i = start; i <= end; i++) {
          range.push(i)
        }
        return range
      })

      if (
        range1.intersection(range2).length ||
        range2.intersection(range1).length
      ) {
        res++
      }

      return res
    }, 0)
}

module.exports = { part1, part2 }
