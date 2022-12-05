require("../utils")()

const part1 = input => {
  let [lines, moves] = input.toBlocks()
  lines = lines.map(line => line.split("")).slice(0, -1)

  let stacks = []
  for (let i = 1; i < lines[0].length; i += 4) {
    const stack = []
    for (let j = 0; j < lines.length; j++) {
      stack.push(lines[j][i])
    }
    stacks.push(stack)
  }

  stacks = stacks.map(stack => stack.filter(stack => stack !== " "))

  moves.map(move => {
    const [count, from, to] = move
      .replaceAll("move ", "")
      .split(/ from | to /)
      .toNumbers()

    Array.from({ length: count }).map(() => {
      stacks[to - 1].unshift(...stacks[from - 1].shift())
    })
  })

  return stacks.map(stack => stack[0]).join("")
}

const part2 = input => {
  let [lines, moves] = input.toBlocks()
  lines = lines.map(line => line.split("")).slice(0, -1)

  let stacks = []
  for (let i = 1; i < lines[0].length; i += 4) {
    const stack = []
    for (let j = 0; j < lines.length; j++) {
      stack.push(lines[j][i])
    }
    stacks.push(stack)
  }

  stacks = stacks.map(stack => stack.filter(stack => stack !== " "))

  moves.map(move => {
    const [count, from, to] = move
      .replaceAll("move ", "")
      .split(/ from | to /)
      .toNumbers()

    stacks[to - 1].unshift(...stacks[from - 1].splice(0, count))
  })

  return stacks.map(stack => stack[0]).join("")
}

module.exports = { part1, part2 }
