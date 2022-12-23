require("../utils")()

let grid = []

const getUp = (x, y) => [
  [x - 1, y - 1],
  [x, y - 1],
  [x + 1, y - 1],
]
const getRight = (x, y) => [
  [x + 1, y - 1],
  [x + 1, y],
  [x + 1, y + 1],
]
const getDown = (x, y) => [
  [x - 1, y + 1],
  [x, y + 1],
  [x + 1, y + 1],
]
const getLeft = (x, y) => [
  [x - 1, y - 1],
  [x - 1, y],
  [x - 1, y + 1],
]

const move = (fromX, fromY, toX, toY) => {
  grid[fromY][fromX] = "."
  grid[toY][toX] = "#"
}

const part1 = input => {
  let border = 100

  grid = input.toLines().map(line => line.split(""))
  grid = grid.map(row => [
    ...Array(border).fill("."),
    ...row,
    ...Array(border).fill("."),
  ])
  grid = JSON.parse(
    JSON.stringify([
      ...Array(border).fill(Array(grid[0].length).fill(".")),
      ...grid,
      ...Array(border).fill(Array(grid[0].length).fill(".")),
    ])
  )

  const dirs = [0, 2, 3, 1]
  const getAdjs = { 0: getUp, 1: getRight, 2: getDown, 3: getLeft }
  const next = { 0: [0, -1], 1: [1, 0], 2: [0, 1], 3: [-1, 0] }

  loop(10, () => {
    let elfs = {}

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        const cell = grid[y][x]
        if (cell === ".") continue

        const alone = [y - 1, y, y + 1].every(ny =>
          [x - 1, x, x + 1].every(
            nx => grid[ny][nx] !== "#" || (nx === x && ny === y)
          )
        )
        if (alone) continue

        for (let i = 0; i < dirs.length; i++) {
          const dir = dirs[i]
          const getAdj = getAdjs[dir]
          const adjs = getAdj(x, y)
          const occupied = adjs.some(([nx, ny]) => grid[ny][nx] === "#")

          if (!occupied) {
            const [dx, dy] = next[dir]
            const key = `${x + dx},${y + dy}`
            elfs[key] = key in elfs ? undefined : [x, y]

            break
          }
        }
      }
    }

    for (let elf of Object.keys(elfs)) {
      const fromPos = elfs[elf]
      if (fromPos === undefined) continue

      move(...fromPos, ...elf.split(","))
    }

    dirs.push(dirs.shift())
  })

  let top = 0
  let right = 0
  let bottom = Number.MAX_SAFE_INTEGER
  let left = Number.MAX_SAFE_INTEGER
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "#") {
        top = Math.max(top, y)
        bottom = Math.min(bottom, y)
        left = Math.min(left, x)
        right = Math.max(right, x)
      }
    }
  }

  let res = 0
  for (let y = bottom; y <= top; y++) {
    for (let x = left; x <= right; x++) {
      res += grid[y][x] === "."
    }
  }

  return res
}

const part2 = input => {
  let border = 100

  grid = input.toLines().map(line => line.split(""))
  grid = grid.map(row => [
    ...Array(border).fill("."),
    ...row,
    ...Array(border).fill("."),
  ])
  grid = JSON.parse(
    JSON.stringify([
      ...Array(border).fill(Array(grid[0].length).fill(".")),
      ...grid,
      ...Array(border).fill(Array(grid[0].length).fill(".")),
    ])
  )

  const dirs = [0, 2, 3, 1]
  const getAdjs = { 0: getUp, 1: getRight, 2: getDown, 3: getLeft }
  const next = { 0: [0, -1], 1: [1, 0], 2: [0, 1], 3: [-1, 0] }

  let round = 0
  while (true) {
    let elfs = {}

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        const cell = grid[y][x]
        if (cell === ".") continue

        const alone = [y - 1, y, y + 1].every(ny =>
          [x - 1, x, x + 1].every(
            nx => grid[ny][nx] !== "#" || (nx === x && ny === y)
          )
        )

        if (alone) continue

        for (let i = 0; i < dirs.length; i++) {
          const dir = dirs[i]
          const getAdj = getAdjs[dir]
          const adjs = getAdj(x, y)
          const occupied = adjs.some(([nx, ny]) => grid[ny][nx] === "#")

          if (!occupied) {
            const [dx, dy] = next[dir]
            const key = `${x + dx},${y + dy}`
            elfs[key] = key in elfs ? undefined : [x, y]

            break
          }
        }
      }
    }

    if (Object.keys(elfs).length === 0) break

    for (let elf of Object.keys(elfs)) {
      const fromPos = elfs[elf]
      if (fromPos === undefined) continue

      move(...fromPos, ...elf.split(","))
    }

    dirs.push(dirs.shift())
    round++
  }

  return round + 1
}

module.exports = { part1, part2 }
