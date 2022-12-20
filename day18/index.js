require("../utils")()

const equals = (cube1, cube2) => {
  let equal = false

  for (let i = 0; i < cube1.length; i++) {
    if (cube1[i] === cube2[i]) equal = true
    else return false
  }

  return equal
}

const memo = {}
const getCubeDetails = (air, cubes, visited = []) => {
  if (memo[`${air[0]},${air[1]},${air[2]}}`]) {
    return { isAirPocket: memo[`${air[0]},${air[1]},${air[2]}}`], visited }
  }

  const [x, y, z] = air
  const min = 0
  const max = 20

  if (x < min || x > max || y < min || y > max || z < min || z > max) {
    return { isAirPocket: false, visited }
  }

  const sides = [
    [x + 1, y, z],
    [x - 1, y, z],
    [x, y + 1, z],
    [x, y - 1, z],
    [x, y, z + 1],
    [x, y, z - 1],
  ]

  let res = { isAirPocket: true, visited }
  for (const side of sides) {
    let isBlock = false
    for (const cube of cubes) {
      if (equals(cube, side)) {
        isBlock = true
        break
      }
    }

    if (!isBlock) {
      let hasBeenVisited = false
      for (const cube of visited) {
        if (equals(cube, side)) {
          hasBeenVisited = true
          break
        }
      }

      if (!hasBeenVisited) {
        res = getCubeDetails(side, cubes, [air, ...visited])
      }

      if (!res.isAirPocket) break
    }
  }

  for (const [x, y, z] of res.visited) {
    memo[`${x},${y},${z}}`] = res.isAirPocket
  }

  return res
}

const part1 = input => {
  const cubes = input.toLines().map(line => line.split(",").toNumbers())
  const totalSides = cubes.length * 6

  let connected = 0
  for (const [x, y, z] of cubes) {
    const sides = [
      [x + 1, y, z],
      [x - 1, y, z],
      [x, y + 1, z],
      [x, y - 1, z],
      [x, y, z + 1],
      [x, y, z - 1],
    ]

    for (const side of sides) {
      for (const cube of cubes) {
        if (equals(cube, side)) {
          connected++
          break
        }
      }
    }
  }

  return totalSides - connected
}

const part2 = input => {
  const cubes = input.toLines().map(line => line.split(",").toNumbers())
  const totalSides = cubes.length * 6

  let connected = 0
  let airPockets = 0
  for (const [x, y, z] of cubes) {
    const sides = [
      [x + 1, y, z],
      [x - 1, y, z],
      [x, y + 1, z],
      [x, y - 1, z],
      [x, y, z + 1],
      [x, y, z - 1],
    ]

    for (const side of sides) {
      let isCube = false
      for (const cube of cubes) {
        if (equals(cube, side)) {
          connected++
          isCube = true
          break
        }
      }

      if (!isCube && getCubeDetails(side, cubes).isAirPocket) {
        airPockets++
      }
    }
  }

  return totalSides - connected - airPockets
}

module.exports = { part1, part2 }
