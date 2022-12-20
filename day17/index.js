require("../utils")()

const rocks = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
]

const getSignature = (set, newTop) => {
  let signature = []

  for (const el of set) {
    const [x, y] = el.split(",").toNumbers()
    if (newTop - y <= 30) {
      signature.push([x, newTop - y])
    }
  }

  return signature
}

const part1 = input => {
  const dirs = input.split("")

  let rockIndex = 0
  let x = 2
  let y = 3
  let dirIndex = 0
  let rockCount = 0
  let top = 0
  const resting = new Set()
  while (rockCount < 2022) {
    const dir = dirs[dirIndex]
    let rock = rocks[rockIndex]

    const bottomIsBlocked =
      y - top <= 0 &&
      rock.some(([dx, dy]) => y + dy < 0 || resting.has(`${x + dx},${y + dy}`))

    if (bottomIsBlocked) {
      top = Math.max(top, rock.map(([_, dy]) => y + 1 + dy + 1).max())
      rock.forEach(([dx, dy]) => resting.add(`${x + dx},${y + 1 + dy}`))

      x = 2
      y = 3 + top

      rockIndex = (rockIndex + 1) % rocks.length
      rock = rocks[rockIndex]
      rockCount++
    }

    if (dir === ">") {
      x += rock.every(
        ([dx, dy]) => x + 1 + dx < 7 && !resting.has(`${x + 1 + dx},${y + dy}`)
      )
    } else {
      x -= rock.every(
        ([dx, dy]) => x - 1 + dx >= 0 && !resting.has(`${x - 1 + dx},${y + dy}`)
      )
    }

    y--
    dirIndex = (dirIndex + 1) % dirs.length
  }

  return top
}

const part2 = input => {
  const dirs = input.split("")

  let rockIndex = 0
  let x = 2
  let y = 3
  let dirIndex = 0
  let rockCount = 0
  let top = 0
  let res = 0
  let memo = {}
  const resting = new Set()
  const finalCount = 1000000000000
  while (rockCount < finalCount) {
    const dir = dirs[dirIndex]
    let rock = rocks[rockIndex]

    const bottomIsBlocked =
      y - top <= 0 &&
      rock.some(([dx, dy]) => y + dy < 0 || resting.has(`${x + dx},${y + dy}`))

    if (bottomIsBlocked) {
      top = Math.max(top, rock.map(([_, dy]) => y + 1 + dy + 1).max())
      rock.forEach(([dx, dy]) => resting.add(`${x + dx},${y + 1 + dy}`))

      const key = JSON.stringify([
        dirIndex,
        rockIndex,
        getSignature(resting, top),
      ])

      if (key in memo) {
        const [oldTop, oldRockCount] = memo[key]
        const dTop = top - oldTop
        const dRockCount = rockCount - oldRockCount
        memo = {}

        res = 0
        do {
          rockCount += dRockCount
          res += dTop
        } while (rockCount + dRockCount < finalCount)
      }

      memo[key] = [top, rockCount]

      x = 2
      y = 3 + top

      rockIndex = (rockIndex + 1) % rocks.length
      rock = rocks[rockIndex]
      rockCount++
    }

    if (dir === ">") {
      x += rock.every(
        ([dx, dy]) => x + 1 + dx < 7 && !resting.has(`${x + 1 + dx},${y + dy}`)
      )
    } else {
      x -= rock.every(
        ([dx, dy]) => x - 1 + dx >= 0 && !resting.has(`${x - 1 + dx},${y + dy}`)
      )
    }

    y--
    dirIndex = (dirIndex + 1) % dirs.length
  }

  return top + res
}

module.exports = { part1, part2 }
