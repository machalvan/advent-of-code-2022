require("../utils")()

const isNeighbour = (x1, y1, x2, y2) =>
  Math.abs(x2 - x1) <= 1 && Math.abs(y2 - y1) <= 1

const getNewPos = (x, y, headX, headY) => {
  if (isNeighbour(x, y, headX, headY)) return [x, y]

  const newX = x + (headX - x >= 1 ? 1 : x - headX >= 1 ? -1 : 0)
  const newY = y + (headY - y >= 1 ? 1 : y - headY >= 1 ? -1 : 0)
  return [newX, newY]
}

const part1 = input => {
  const lines = input.toLines().map(line => line.split(" "))

  const side = 1000
  const grid = createGrid(side, side)
  let x = side / 2
  let y = side / 2
  const knotsCount = 2
  let rope = Array(knotsCount).fill([x, y])

  lines.forEach(([dir, steps]) => {
    if (dir === "U") {
      loop(steps, () => {
        y -= 1

        rope[0] = [x, y]
        loop(knotsCount - 1, i => {
          rope[i + 1] = getNewPos(...rope[i + 1], ...rope[i])
        })

        const [tailX, tailY] = rope.at(-1)
        grid[tailY][tailX] = 1
      })
    } else if (dir === "R") {
      loop(steps, () => {
        x += 1

        rope[0] = [x, y]
        loop(knotsCount - 1, i => {
          rope[i + 1] = getNewPos(...rope[i + 1], ...rope[i])
        })

        const [tailX, tailY] = rope.at(-1)
        grid[tailY][tailX] = 1
      })
    } else if (dir === "D") {
      loop(steps, () => {
        y += 1

        rope[0] = [x, y]
        loop(knotsCount - 1, i => {
          rope[i + 1] = getNewPos(...rope[i + 1], ...rope[i])
        })

        const [tailX, tailY] = rope.at(-1)
        grid[tailY][tailX] = 1
      })
    } else {
      loop(steps, () => {
        x -= 1

        rope[0] = [x, y]
        loop(knotsCount - 1, i => {
          rope[i + 1] = getNewPos(...rope[i + 1], ...rope[i])
        })

        const [tailX, tailY] = rope.at(-1)
        grid[tailY][tailX] = 1
      })
    }
  })

  return grid.map(row => row.sum()).sum()
}

const part2 = input => {
  const lines = input.toLines().map(line => line.split(" "))

  const side = 1000
  const grid = createGrid(side, side)
  let x = side / 2
  let y = side / 2
  const knotsCount = 10
  let rope = Array(knotsCount).fill([x, y])

  lines.forEach(([dir, steps]) => {
    if (dir === "U") {
      loop(steps, () => {
        y -= 1

        rope[0] = [x, y]
        loop(knotsCount - 1, i => {
          rope[i + 1] = getNewPos(...rope[i + 1], ...rope[i])
        })

        const [tailX, tailY] = rope.at(-1)
        grid[tailY][tailX] = 1
      })
    } else if (dir === "R") {
      loop(steps, () => {
        x += 1

        rope[0] = [x, y]
        loop(knotsCount - 1, i => {
          rope[i + 1] = getNewPos(...rope[i + 1], ...rope[i])
        })

        const [tailX, tailY] = rope.at(-1)
        grid[tailY][tailX] = 1
      })
    } else if (dir === "D") {
      loop(steps, () => {
        y += 1

        rope[0] = [x, y]
        loop(knotsCount - 1, i => {
          rope[i + 1] = getNewPos(...rope[i + 1], ...rope[i])
        })

        const [tailX, tailY] = rope.at(-1)
        grid[tailY][tailX] = 1
      })
    } else {
      loop(steps, () => {
        x -= 1

        rope[0] = [x, y]
        loop(knotsCount - 1, i => {
          rope[i + 1] = getNewPos(...rope[i + 1], ...rope[i])
        })

        const [tailX, tailY] = rope.at(-1)
        grid[tailY][tailX] = 1
      })
    }
  })

  return grid.map(row => row.sum()).sum()
}

module.exports = { part1, part2 }
