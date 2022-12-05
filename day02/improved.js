require("../utils")()

const part1 = input => {
  const game = {
    X: { A: 4, B: 1, C: 7 },
    Y: { A: 8, B: 5, C: 2 },
    Z: { A: 3, B: 9, C: 6 },
  }

  return input.toLines().reduce((acc, line) => {
    const [opp, me] = line.split(" ")
    return acc + game[me][opp]
  }, 0)
}

const part2 = input => {
  const game = {
    X: { A: 3, B: 1, C: 2 },
    Y: { A: 4, B: 5, C: 6 },
    Z: { A: 8, B: 9, C: 7 },
  }

  return input.toLines().reduce((acc, line) => {
    const [opp, me] = line.split(" ")
    return acc + game[me][opp]
  }, 0)
}

module.exports = { part1, part2 }
