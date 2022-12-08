require("../utils")()

const part1 = input => {
  const grid = input.toGrid().map(row => row.toNumbers())
  let res = 0

  for (let [i, row] of grid.entries()) {
    for (let [j, tree] of row.entries()) {
      const left = grid[i].slice(0, j)
      const right = grid[i].slice(j + 1)
      const top = grid.map(row => row[j]).slice(0, i)
      const bottom = grid.map(row => row[j]).slice(i + 1)

      if ([left, right, top, bottom].some(dir => tree > Math.max(...dir))) {
        res += 1
      }
    }
  }

  return res
}

const part2 = input => {
  const grid = input.toGrid().map(row => row.toNumbers())

  let res = []
  for (let [i, row] of grid.entries()) {
    for (let [j, tree] of row.entries()) {
      const left = grid[i].slice(0, j)
      const right = grid[i].slice(j + 1)
      const top = grid.map(row => row[j]).slice(0, i)
      const bottom = grid.map(row => row[j]).slice(i + 1)

      res.push(
        [left.reverse(), right, top.reverse(), bottom]
          .map(dir => {
            const i = dir.findIndex(el => el >= tree)
            return i === -1 ? dir.length : i + 1
          })
          .prod()
      )
    }
  }

  return Math.max(...res)
}

module.exports = { part1, part2 }
