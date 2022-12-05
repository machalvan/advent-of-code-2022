const { readFileSync } = require("fs")
require("../utils")()

const part1 = input => {
  let [stacks, moves] = input.toBlocks()

  stacks = stacks
    .slice(0, -1)
    .map(line => line.split("").filter((_, i) => i % 4 === 1))
    .transpose()
    .map(stack => stack.filter(stack => stack !== " "))

  moves.map(move => {
    const [count, from, to] = move.getDigits()
    stacks[to - 1].unshift(...stacks[from - 1].splice(0, count).reverse())
  })

  return stacks.map(stack => stack[0]).join("")
}

const part2 = input => {
  let [stacks, moves] = input.toBlocks()

  stacks = stacks
    .slice(0, -1)
    .map(line => line.split("").filter((_, i) => i % 4 === 1))
    .transpose()
    .map(stack => stack.filter(stack => stack !== " "))

  moves.map(move => {
    const [count, from, to] = move.getDigits()
    stacks[to - 1].unshift(...stacks[from - 1].splice(0, count))
  })

  return stacks.map(stack => stack[0]).join("")
}

const input = readFileSync("input.txt", "utf8").trimEnd()
console.log(part1(input))
console.log(part2(input))
