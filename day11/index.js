require("../utils")()

const part1 = input => {
  const monkeys = input.toBlocks().map(block =>
    block.reduce((acc, line, i) => {
      if (i == 1) {
        acc.items = line.split(":")[1].split(",").toNumbers()
      } else if (i == 2) {
        acc.op = line.split(" ").slice(-2)
      } else if (i == 3) {
        acc.test = parseInt(line.split(" ").at(-1))
      } else if (i == 4) {
        acc.ifTrue = line.split(" ").at(-1)
      } else if (i == 5) {
        acc.ifFalse = line.split(" ").at(-1)
      }

      return acc
    }, {})
  )

  const inspects = []
  loop(20, () => {
    monkeys.forEach(({ items, op: [op, val], test, ifTrue, ifFalse }, i) => {
      while (items.length > 0) {
        eval(`items[0] ${op}= ${isNaN(val) ? items[0] : val}`)

        items[0] = Math.floor(items[0] / 3)

        const nextMonkey = monkeys[items[0] % test === 0 ? ifTrue : ifFalse]
        nextMonkey.items.push(items.shift())

        inspects[i] = (inspects[i] || 0) + 1
      }
    })
  })

  return inspects.sortDesc().slice(0, 2).prod()
}

const part2 = input => {
  const monkeys = input.toBlocks().map(block =>
    block.reduce((acc, line, i) => {
      if (i == 1) {
        acc.items = line.split(":")[1].split(",").toNumbers()
      } else if (i == 2) {
        acc.op = line.split(" ").slice(-2)
      } else if (i == 3) {
        acc.test = parseInt(line.split(" ").at(-1))
      } else if (i == 4) {
        acc.ifTrue = line.split(" ").at(-1)
      } else if (i == 5) {
        acc.ifFalse = line.split(" ").at(-1)
      }

      return acc
    }, {})
  )

  const common = monkeys.reduce((acc, monkey) => acc * monkey.test, 1)

  const inspects = []
  loop(10_000, () => {
    monkeys.forEach(({ items, op: [op, val], test, ifTrue, ifFalse }, i) => {
      while (items.length > 0) {
        eval(`items[0] ${op}= ${isNaN(val) ? items[0] : val}`)

        items[0] %= common

        const nextMonkey = monkeys[items[0] % test === 0 ? ifTrue : ifFalse]
        nextMonkey.items.push(items.shift())

        inspects[i] = (inspects[i] || 0) + 1
      }
    })
  })

  return inspects.sortDesc().slice(0, 2).prod()
}

module.exports = { part1, part2 }
