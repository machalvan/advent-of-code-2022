require("../utils")()

const mapping = { "=": -2, "-": -1, 0: 0, 1: 1, 2: 2 }
const snafu = ["0", "1", "2", "=", "-"]

const snafuToDec = num => {
  return num
    .split("")
    .reverse()
    .map((char, i) => mapping[char] * 5 ** i)
    .sum()
}

const decToSnafu = num => {
  const res = [snafu[num % 5]]

  const fives = []
  for (let i = 0; i < 25; i++) {
    fives.push(5 ** i)
    res.push(snafu[Math.floor((num + 2 * fives.sum()) / 5 ** (i + 1)) % 5])
  }

  return res.reverse().join("").replace(/^0+/, "")
}

const part1 = input => {
  const num = input
    .toLines()
    .map(line => snafuToDec(line))
    .sum()

  return decToSnafu(num)
}

const part2 = input => {
  return
}

module.exports = { part1, part2 }
