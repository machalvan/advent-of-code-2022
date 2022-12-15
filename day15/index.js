require("../utils")()

const part1 = input => {
  const sensors = input
    .toLines()
    .map(line => line.getDigits())
    .map(([x, y, bx, by]) => ({ x, y, bx, by, dist: manhattan(x, y, bx, by) }))

  const beacons = new Set()
  const y = 2_000_000
  range(-5_000_000, 5_000_000).forEach(x => {
    for (const sensor of sensors) {
      if (x === sensor.x && y === sensor.y) continue
      if (x === sensor.bx && y === sensor.by) continue

      if (manhattan(x, y, sensor.x, sensor.y) <= sensor.dist) {
        beacons.add(JSON.stringify({ x, y }))
      }
    }
  })

  return beacons.size
}

const part2 = input => {
  const sensors = input
    .toLines()
    .map(line => line.getDigits())
    .map(([x, y, bx, by]) => ({ x, y, bx, by, dist: manhattan(x, y, bx, by) }))

  let borders = []
  const m = 4_000_000

  for (const { x, y, dist } of sensors) {
    let borderY = 0

    for (let borderX = x - dist - 1; borderX <= x + dist + 1; borderX++) {
      if (x >= 0 && x < m) {
        const lowY = y - borderY
        const highY = y + borderY

        if (lowY >= 0 && lowY < m) {
          borders.push({ x: borderX, y: lowY })
        }

        if (highY >= 0 && highY < m) {
          borders.push({ x: borderX, y: highY })
        }
      }

      borderY += borderX < x ? 1 : -1
    }
  }

  for (const { x, y } of borders) {
    let tooClose = false
    for (const sensor of sensors) {
      if (manhattan(x, y, sensor.x, sensor.y) <= sensor.dist) {
        tooClose = true
        break
      }
    }

    if (!tooClose) return x * 4000000 + y
  }
}

module.exports = { part1, part2 }
