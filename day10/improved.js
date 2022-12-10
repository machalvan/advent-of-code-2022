require("../utils")()

const part1 = input => {
  const lines = input.toLines().map(line => line.split(" "))
  let i = 0
  let cycle = 1
  let X = 1
  let res = 0

  while (cycle < 220) {
    const [op, arg] = lines[i]
    cycle++

    if (op !== "noop") {
      res += cycle % 40 === 20 ? X * cycle : 0
      X += parseInt(arg)
      cycle++
    }

    res += cycle % 40 === 20 ? X * cycle : 0
    i++
  }

  return res
}

const part2 = input => {
  const lines = input.toLines().map(line => line.split(" "))
  let i = 0
  let cycle = 1
  let X = 1
  let res = ""

  while (cycle < 240) {
    const [op, arg] = lines[i]

    loop(op !== "noop" ? 2 : 1, () => {
      res += [X - 1, X, X + 1].includes((cycle - 1) % 40) ? "#" : "."
      res += cycle % 40 === 0 ? "\n" : ""
      cycle++
    })

    X += op !== "noop" ? parseInt(arg) : 0
    i++
  }

  return res
}

module.exports = { part1, part2 }
