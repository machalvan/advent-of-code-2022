require("../utils")()

const part1 = input => {
  return input.toLines().reduce((acc, line) => {
    const half = line.length / 2
    const first = line.slice(0, half).toList()
    const second = line.slice(half).toList()
    const intersection = first.intersection(second)[0]
    const offset = intersection.isUpperCase() ? 38 : 96

    return acc + intersection.charCodeAt(0) - offset
  }, 0)
}

const part2 = input => {
  const lines = input.toLines()

  let res = 0
  while (lines.length > 0) {
    const [first, second, third] = lines.splice(0, 3).map(line => line.toList())
    const intersection = first.intersection(second).intersection(third)[0]
    const offset = intersection.isUpperCase() ? 38 : 96

    res += intersection.charCodeAt(0) - offset
  }

  return res
}

module.exports = { part1, part2 }
