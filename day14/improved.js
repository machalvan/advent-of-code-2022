require("../utils")()

const part1 = input => {
  const rocksAndSand = new Set()

  input
    .toLines()
    .map(line => line.split(" -> ").map(point => point.split(",").toNumbers()))
    .map(line => {
      loop(line.length - 1, i => {
        const [startX, startY] = line[i]
        const [endX, endY] = line[i + 1]

        if (startX === endX) {
          range(startY, endY).forEach(y => rocksAndSand.add(`${startX},${y}`))
        } else {
          range(startX, endX).forEach(x => rocksAndSand.add(`${x},${startY}`))
        }
      })
    })

  const rocksCount = rocksAndSand.size
  let x = 500
  let y = 0

  while (y < 1000) {
    if (rocksAndSand.has(`${x},${y + 1}`)) {
      if (rocksAndSand.has(`${x - 1},${y + 1}`)) {
        if (rocksAndSand.has(`${x + 1},${y + 1}`)) {
          rocksAndSand.add(`${x},${y}`)
          x = 500
          y = -1
        } else {
          x += 1
        }
      } else {
        x -= 1
      }
    }

    y += 1
  }

  return rocksAndSand.size - rocksCount
}

const part2 = input => {
  const [rocksAndSand, maxY] = input
    .toLines()
    .map(line => line.split(" -> ").map(point => point.split(",").toNumbers()))
    .reduce(
      ([rocksAndSand, maxY], line) => {
        loop(line.length - 1, i => {
          const [startX, startY] = line[i]
          const [endX, endY] = line[i + 1]

          if (startX === endX) {
            range(startY, endY).forEach(y => rocksAndSand.add(`${startX},${y}`))
          } else {
            range(startX, endX).forEach(x => rocksAndSand.add(`${x},${startY}`))
          }
        })

        return [rocksAndSand, Math.max(maxY, ...line.map(([_, y]) => y))]
      },
      [new Set(), 0]
    )

  range(-1000, 1000).forEach(x => rocksAndSand.add(`${x},${maxY + 2}`))

  const rocksCount = rocksAndSand.size
  let x = 500
  let y = 0

  while (!rocksAndSand.has(`500,0`)) {
    if (rocksAndSand.has(`${x},${y + 1}`)) {
      if (rocksAndSand.has(`${x - 1},${y + 1}`)) {
        if (rocksAndSand.has(`${x + 1},${y + 1}`)) {
          rocksAndSand.add(`${x},${y}`)
          x = 500
          y = -1
        } else {
          x += 1
        }
      } else {
        x -= 1
      }
    }

    y += 1
  }

  return rocksAndSand.size - rocksCount
}

module.exports = { part1, part2 }
