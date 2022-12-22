require("../utils")()

const mapObj = {}

const move = (pos, face) => {
  const [x, y] = pos
  switch (face) {
    case 0:
      return [x + 1, y]
    case 1:
      return [x, y + 1]
    case 2:
      return [x - 1, y]
    case 3:
      return [x, y - 1]
  }
}

const hasWall = pos => mapObj[`${pos[0]},${pos[1]}`] === "#"

const wrapPart1 = ([x, y], face) => {
  if (mapObj[`${x},${y}`] !== undefined) return [x, y]

  const m = 1000
  let newX = x
  let newY = y
  switch (face) {
    case 0:
      newX = x - m
      for (let i = 0; i < m; i++) {
        if (mapObj[`${newX + i},${newY}`] !== undefined) return [newX + i, newY]
      }
      break
    case 1:
      newY = y - m
      for (let i = 0; i < m; i++) {
        if (mapObj[`${newX},${newY + i}`] !== undefined) return [newX, newY + i]
      }
      break

    case 2:
      newX = x + m
      for (let i = 0; i < m; i++) {
        if (mapObj[`${newX - i},${newY}`] !== undefined) return [newX - i, newY]
      }
      break

    case 3:
      newY = y + m
      for (let i = 0; i < m; i++) {
        if (mapObj[`${newX},${newY - i}`] !== undefined) return [newX, newY - i]
      }
  }
}

const wrapPart2 = (testPos, pos, face, mappings) => {
  if (mapObj[`${testPos[0]},${testPos[1]}`] !== undefined)
    return [testPos, face]

  return mappings[`${pos[0]},${pos[1]},${face}`]
}

const part1 = input => {
  let [map, pass] = input.toBlocks()
  pass = pass[0]
    .match(/[a-zA-Z]+|[0-9]+/g)
    .map(v => (isNaN(v) ? v : parseInt(v)))
  map = map.map(row => row.split(""))

  let pos
  let face = 0
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const char = map[row][col]
      if (char !== " ") {
        mapObj[`${col},${row}`] = char

        if (pos === undefined) {
          pos = [col, row]
        }
      }
    }
  }

  for (const value of pass) {
    if (isNaN(value)) {
      face = value === "R" ? (face + 1) % 4 : (face + 4 - 1) % 4
    } else {
      for (let i = 0; i < value; i++) {
        let testPos = move(pos, face)
        testPos = wrapPart1(testPos, face)
        if (hasWall(testPos)) break

        pos = testPos
      }
    }
  }

  const [col, row] = pos
  return (row + 1) * 1000 + (col + 1) * 4 + face
}

const part2 = input => {
  let [map, pass] = input.toBlocks()
  pass = pass[0]
    .match(/[a-zA-Z]+|[0-9]+/g)
    .map(v => (isNaN(v) ? v : parseInt(v)))
  map = map.map(row => row.split(""))

  let pos
  let face = 0
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const char = map[row][col]
      if (char !== " ") {
        mapObj[`${col},${row}`] = char

        if (pos === undefined) {
          pos = [col, row]
        }
      }
    }
  }

  let mappings = {}
  let maxRow = map.length
  let maxCol = map.reduce((acc, cur) => Math.max(acc, cur.length), 0)
  let side = 50
  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      const key = `${col},${row},`

      if (row === 0 && col >= side * 1 && col < side * 2) {
        const nCol = 0
        const nRow = side * 3 + (col % side)
        mappings[key + 3] = [[nCol, nRow], 0]
        mappings[`${nCol},${nRow},2`] = [[col, row], 1]
      }

      if (row === 0 && col >= side * 2 && col < side * 3) {
        const nx = col % side
        const ny = maxRow - 1
        mappings[key + 3] = [[nx, ny], 3]
        mappings[`${nx},${ny},1`] = [[col, row], 1]
      }

      if (row >= 0 && row < side * 1 && col === maxCol - 1) {
        const nx = side * 2 - 1
        const ny = side * 3 - 1 - (row % side)
        mappings[key + 0] = [[nx, ny], 2]
        mappings[`${nx},${ny},0`] = [[col, row], 2]
      }

      if (row === side * 1 - 1 && col >= side * 2 < maxCol) {
        const nx = side * 2 - 1
        const ny = side * 1 + (col % side)
        mappings[key + 1] = [[nx, ny], 2]
        mappings[`${nx},${ny},0`] = [[col, row], 3]
      }

      if (row === side * 3 - 1 && col >= side * 1 && col < side * 2) {
        const nx = side * 1 - 1
        const ny = side * 3 + (col % side)
        mappings[key + 1] = [[nx, ny], 2]
        mappings[`${nx},${ny},0`] = [[col, row], 3]
      }

      if (row >= side * 2 && row < side * 3 && col === 0) {
        const nx = side * 1
        const ny = side * 1 - 1 - (row % side)
        mappings[key + 2] = [[nx, ny], 0]
        mappings[`${nx},${ny},2`] = [[col, row], 0]
      }

      if (row === side * 2 && col >= 0 && col < side) {
        const nx = side * 1
        const ny = side * 1 + (col % side)
        mappings[key + 3] = [[nx, ny], 0]
        mappings[`${nx},${ny},2`] = [[col, row], 1]
      }
    }
  }

  for (const value of pass) {
    if (isNaN(value)) {
      face = value === "R" ? (face + 1) % 4 : (face + 4 - 1) % 4
    } else {
      for (let i = 0; i < value; i++) {
        let testPos = move(pos, face)
        const [newPos, newFace] = wrapPart2(testPos, pos, face, mappings)
        testPos = newPos
        if (hasWall(testPos)) break

        pos = testPos
        face = newFace
      }
    }
  }

  const [col, row] = pos
  return (row + 1) * 1000 + (col + 1) * 4 + face
}

module.exports = { part1, part2 }
