require("../utils")()

const part1 = input => {
  return input
    .toBlocks()
    .map(block => block.toNumbers().sum())
    .max()
}

const part2 = input => {
  return input
    .toBlocks()
    .map(block => block.toNumbers().sum())
    .sortDesc()
    .slice(0, 3)
    .sum()
}

module.exports = { part1, part2 }
