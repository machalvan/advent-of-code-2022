require("../utils")()

const part1 = input => {
  const line = input.split("")

  for (let i = 0; i < line.length; i++) {
    const fourChars = line.slice(i, i + 4)
    if (fourChars.length === new Set(fourChars).size) {
      return i + 4
    }
  }
}

const part2 = input => {
  const line = input.split("")

  for (let i = 0; i < line.length; i++) {
    const fourChars = line.slice(i, i + 14)
    if (fourChars.length === new Set(fourChars).size) {
      return i + 14
    }
  }
}

module.exports = { part1, part2 }
