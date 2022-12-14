require("../utils")()

const part1 = input => {
  const allPoints = input
    .toLines()
    .map(line => line.split(" -> ").map(point => point.split(",").toNumbers()))

  const rocks = new Set()
  allPoints.map(line => {
    for (let i = 0; i < line.length - 1; i++) {
      const start = line[i]
      const end = line[i + 1]

      if (start[0] === end[0]) {
        range(start[1], end[1]).forEach(y => {
          rocks.add(`${start[0]},${y}`)
        })
      } else {
        range(start[0], end[0]).forEach(x => {
          rocks.add(`${x},${start[1]}`)
        })
      }
    }
  })

  let sand = new Set()
  let x = 500
  let y = 0

  while (y < 2000) {
    if (!rocks.has(`${x},${y + 1}`) && !sand.has(`${x},${y + 1}`)) {
      y += 1
      continue
    }

    if (!rocks.has(`${x - 1},${y + 1}`) && !sand.has(`${x - 1},${y + 1}`)) {
      x -= 1
    } else if (
      !rocks.has(`${x + 1},${y + 1}`) &&
      !sand.has(`${x + 1},${y + 1}`)
    ) {
      x += 1
    } else {
      sand.add(`${x},${y}`)
      y = 0
      x = 500
      continue
    }

    y += 1
  }

  return sand.size
}

const part2 = input => {
  const allPoints = input
    .toLines()
    .map(line => line.split(" -> ").map(point => point.split(",").toNumbers()))

  const rocks = new Set()
  let highestY = 0
  allPoints.map(line => {
    for (let i = 0; i < line.length - 1; i++) {
      const start = line[i]
      const end = line[i + 1]

      highestY = Math.max(highestY, start[1], end[1])

      if (start[0] === end[0]) {
        range(start[1], end[1]).forEach(y => {
          rocks.add(`${start[0]},${y}`)
        })
      } else {
        range(start[0], end[0]).forEach(x => {
          rocks.add(`${x},${start[1]}`)
        })
      }
    }
  })

  const r = range(-1000, 1000)
  r.forEach(x => {
    rocks.add(`${x},${highestY + 2}`)
  })

  let sand = new Set()
  let x = 500
  let y = 0

  while (!sand.has(`500,0`)) {
    if (!rocks.has(`${x},${y + 1}`) && !sand.has(`${x},${y + 1}`)) {
      y += 1
      continue
    }

    if (!rocks.has(`${x - 1},${y + 1}`) && !sand.has(`${x - 1},${y + 1}`)) {
      x -= 1
    } else if (
      !rocks.has(`${x + 1},${y + 1}`) &&
      !sand.has(`${x + 1},${y + 1}`)
    ) {
      x += 1
    } else {
      sand.add(`${x},${y}`)
      y = 0
      x = 500
      continue
    }

    y += 1
  }

  return sand.size
}

module.exports = { part1, part2 }
