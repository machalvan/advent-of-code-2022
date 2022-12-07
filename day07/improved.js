require("../utils")()

const part1 = input => {
  let path = []

  return Object.values(
    input
      .toLines()
      .map(line => line.replace("$ ", "").split(" "))
      .reduce((sizes, [com, arg]) => {
        if (com === "cd") {
          arg === ".." ? path.pop() : path.push(arg)
        } else if (com === "ls") {
        } else if (com === "dir") {
        } else {
          path.forEach((_, i) => {
            const subPath = path.slice(0, i + 1).join("/")
            sizes[subPath] = parseInt(com) + (sizes[subPath] ?? 0)
          })
        }

        return sizes
      }, {})
  )
    .filter(size => size <= 100_000)
    .sum()
}

const part2 = input => {
  let path = []

  const sizes = Object.values(
    input
      .toLines()
      .map(line => line.replace("$ ", "").split(" "))
      .reduce((sizes, [com, arg]) => {
        if (com === "cd") {
          arg === ".." ? path.pop() : path.push(arg)
        } else if (com === "ls") {
        } else if (com === "dir") {
        } else {
          path.forEach((_, i) => {
            const subPath = path.slice(0, i + 1).join("/")
            sizes[subPath] = parseInt(com) + (sizes[subPath] ?? 0)
          })
        }

        return sizes
      }, {})
  )

  const required = sizes[0] - (70_000_000 - 30_000_000)
  return sizes.sortAsc().find(size => size > required)
}

module.exports = { part1, part2 }
