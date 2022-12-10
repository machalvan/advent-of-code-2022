require("../utils")()

const part1 = input => {
  const lines = input.toLines().map(line => line.split(" "))
  let X = 1
  let cycle = 1
  let res = 0

  let i = 0
  while (true) {
    const [op, arg] = lines[i]
    cycle++

    if (op !== "noop") {
      if (cycle % 40 === 20) {
        res += X * cycle
      }

      cycle++
      X += parseInt(arg)
    }

    if (cycle % 40 === 20) {
      res += X * cycle
    }

    if (cycle > 220) break
    i++
  }

  return res
}

const part2 = input => {
  const lines = input.toLines().map(line => line.split(" "))
  let X = 1
  let cycle = 1
  let res = ""

  let i = 0
  while (true) {
    res += [X - 1, X, X + 1].includes((cycle - 1) % 40) ? "#" : "."

    if (cycle % 40 === 0) {
      res += "\n"
    }

    cycle++

    const [op, arg] = lines[i]
    if (op !== "noop") {
      res += [X - 1, X, X + 1].includes((cycle - 1) % 40) ? "#" : "."

      if (cycle % 40 === 0) {
        res += "\n"
      }

      cycle++
      X += parseInt(arg)
    }

    if (cycle > 240) break
    i++
  }

  return res
}

module.exports = { part1, part2 }
