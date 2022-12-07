require("../utils")()

let dirSizes = []

class TreeNode {
  constructor(name, parent, size = 0) {
    this.name = name
    this.parent = parent
    this.children = []
    this.size = size
  }

  get total() {
    if (this.size === 0) {
      // Directory
      const totalSum = this.children.reduce((acc, x) => acc + x.total, 0)
      dirSizes.push(totalSum)

      return totalSum
    } else {
      // File
      return this.size
    }
  }
}

const part1 = input => {
  const lines = input.toLines()
  const tree = new TreeNode("/")
  let workingNode = tree

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const [_, com, arg] = line.split(" ")

    switch (com) {
      case "cd":
        if (arg === "/") {
          workingNode = tree
        } else if (arg === "..") {
          workingNode = workingNode.parent
        } else {
          workingNode = workingNode.children.find(child => child.name === arg)
        }

        i++
        break

      case "ls":
        i++

        while (lines[i][0] !== "$") {
          const [first, second] = lines[i].split(" ")

          if (first === "dir") {
            workingNode.children.push(new TreeNode(second, workingNode))
          } else {
            workingNode.children.push(
              new TreeNode(second, workingNode, parseInt(first))
            )
          }

          i++

          if (i >= lines.length) break
        }

        break
    }
  }

  tree.total

  return dirSizes.filter(size => size < 100_000).sum()
}

const part2 = input => {
  const lines = input.toLines()
  const tree = new TreeNode("/")
  let workingNode = tree

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const [_, com, arg] = line.split(" ")

    switch (com) {
      case "cd":
        if (arg === "/") {
          workingNode = tree
        } else if (arg === "..") {
          workingNode = workingNode.parent
        } else {
          workingNode = workingNode.children.find(child => child.name === arg)
        }

        i++
        break

      case "ls":
        i++

        while (lines[i][0] !== "$") {
          const [first, second] = lines[i].split(" ")

          if (first === "dir") {
            workingNode.children.push(new TreeNode(second, workingNode))
          } else {
            workingNode.children.push(
              new TreeNode(second, workingNode, parseInt(first))
            )
          }

          i++

          if (i >= lines.length) break
        }

        break
    }
  }

  tree.total

  const total = tree.total
  const required = 30_000_000 - (70_000_000 - total)
  return dirSizes.sortAsc().find(size => size > required)
}

module.exports = { part1, part2 }
