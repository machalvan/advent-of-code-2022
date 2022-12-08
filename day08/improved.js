require("../utils")()

const part1 = input => {
  const grid = input.toGrid().map(row => row.toNumbers())

  return grid
    .map((row, i) =>
      row
        .map((tree, j) => {
          const left = row.slice(0, j)
          const right = row.slice(j + 1)
          const top = grid.map(row => row[j]).slice(0, i)
          const bottom = grid.map(row => row[j]).slice(i + 1)

          return [left, right, top, bottom].some(dir => tree > Math.max(...dir))
        })
        .sum()
    )
    .sum()
}

const part2 = input => {
  const grid = input.toGrid().map(row => row.toNumbers())

  return Math.max(
    ...grid.map((row, i) =>
      Math.max(
        ...row.map((tree, j) => {
          const left = row.slice(0, j)
          const right = row.slice(j + 1)
          const top = grid.map(row => row[j]).slice(0, i)
          const bottom = grid.map(row => row[j]).slice(i + 1)

          return [left.reverse(), right, top.reverse(), bottom]
            .map(dir => dir.findIndex(other => other >= tree) + 1 || dir.length)
            .prod()
        })
      )
    )
  )
}

module.exports = { part1, part2 }
