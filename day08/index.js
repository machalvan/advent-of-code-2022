require("../utils")()

const part1 = input => {
  const grid = input.split("\n").map(line => line.split("").toNumbers())

  let res = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const tree = grid[i][j]

      const left = grid[i].slice(0, j)
      const right = grid[i].slice(j + 1)
      const top = grid.map(row => row[j]).slice(0, i)
      const bottom = grid.map(row => row[j]).slice(i + 1)

      if (
        tree > Math.max(...left) ||
        tree > Math.max(...right) ||
        tree > Math.max(...top) ||
        tree > Math.max(...bottom)
      ) {
        res += 1
      }
    }
  }

  return res
}

const part2 = input => {
  const grid = input.split("\n").map(line => line.split("").toNumbers())
  let res = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const tree = grid[i][j]

      const left = grid[i].slice(0, j).reverse()
      const right = grid[i].slice(j + 1)
      const top = grid
        .map(row => row[j])
        .slice(0, i)
        .reverse()
      const bottom = grid.map(row => row[j]).slice(i + 1)

      let vis = []
      for (let dir of [top, left, bottom, right]) {
        const a = dir.findIndex(el => el >= tree)
        const b = a === -1 ? dir.length : a + 1
        vis.push(b)
      }

      res.push(vis.prod())
    }
  }

  return Math.max(...res)
}

module.exports = { part1, part2 }
