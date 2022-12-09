require("../utils")()

const areNeighbours = (x1, y1, x2, y2) =>
  Math.abs(x2 - x1) <= 1 && Math.abs(y2 - y1) <= 1

const getNewPos = ([x, y], [headX, headY]) => {
  if (areNeighbours(x, y, headX, headY)) return [x, y]

  const deltaX = headX - x > 0 ? 1 : headX - x < 0 ? -1 : 0
  const deltaY = headY - y > 0 ? 1 : headY - y < 0 ? -1 : 0

  return [x + deltaX, y + deltaY]
}

const part1 = input => {
  const grid = new Set()
  let x = 0
  let y = 0
  const knotsCount = 2
  const rope = Array(knotsCount).fill([x, y])
  const xMap = { U: 0, R: 1, D: 0, L: -1 }
  const yMap = { U: -1, R: 0, D: 1, L: 0 }

  input
    .toLines()
    .map(line => line.split(" "))
    .forEach(([dir, steps]) => {
      loop(parseInt(steps), () => {
        x += xMap[dir]
        y += yMap[dir]

        loop(knotsCount, i => {
          rope[i] = i === 0 ? [x, y] : getNewPos(rope[i], rope[i - 1])
        })

        grid.add(JSON.stringify(rope.at(-1)))
      })
    })

  return grid.size
}

const part2 = input => {
  const grid = new Set()
  let x = 0
  let y = 0
  const knotsCount = 10
  const rope = Array(knotsCount).fill([x, y])
  const xMap = { U: 0, R: 1, D: 0, L: -1 }
  const yMap = { U: -1, R: 0, D: 1, L: 0 }

  input
    .toLines()
    .map(line => line.split(" "))
    .forEach(([dir, steps]) => {
      loop(parseInt(steps), () => {
        x += xMap[dir]
        y += yMap[dir]

        loop(knotsCount, i => {
          rope[i] = i === 0 ? [x, y] : getNewPos(rope[i], rope[i - 1])
        })

        grid.add(JSON.stringify(rope.at(-1)))
      })
    })

  return grid.size
}

module.exports = { part1, part2 }
