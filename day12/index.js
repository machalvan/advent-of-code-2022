require("../utils")()

const part1 = input => {
  const charBeforeA = String.fromCharCode("a".charCodeAt(0) - 1)
  const charAfterZ = String.fromCharCode("z".charCodeAt(0) + 1)
  const lines = input
    .toLines()
    .map(line =>
      line.replace("S", charBeforeA).replace("E", charAfterZ).split("")
    )

  let graph = {}
  let S, E
  lines.forEach((line, i) => {
    line.forEach((char, j) => {
      const point = JSON.stringify([i, j])
      const charCode = char.charCodeAt(0)
      graph[point] = {}

      if (char === charBeforeA) {
        S = point
      } else if (char === charAfterZ) {
        E = point
      }

      if (i > 0) {
        const diff = lines[i - 1][j].charCodeAt(0) - charCode
        if (diff <= 1) {
          graph[point][JSON.stringify([i - 1, j])] = 1
        }
      }

      if (i < lines.length - 1) {
        const diff = lines[i + 1][j].charCodeAt(0) - charCode
        if (diff <= 1) {
          graph[point][JSON.stringify([i + 1, j])] = 1
        }
      }

      if (j > 0) {
        const diff = line[j - 1].charCodeAt(0) - charCode
        if (diff <= 1) {
          graph[point][JSON.stringify([i, j - 1])] = 1
        }
      }

      if (j < line.length - 1) {
        const diff = line[j + 1].charCodeAt(0) - charCode
        if (diff <= 1) {
          graph[point][JSON.stringify([i, j + 1])] = 1
        }
      }
    })
  })

  return graph.getShortestDistance(S, E)
}

const part2 = input => {
  const charBeforeA = String.fromCharCode("a".charCodeAt(0) - 1)
  const charAfterZ = String.fromCharCode("z".charCodeAt(0) + 1)
  const lines = input
    .toLines()
    .map(line =>
      line.replace("S", charBeforeA).replace("E", charAfterZ).split("")
    )

  let graph = {}
  let Ss = []
  let E
  lines.forEach((line, i) => {
    line.forEach((char, j) => {
      const point = JSON.stringify([i, j])
      const charCode = char.charCodeAt(0)
      graph[point] = {}

      if (char === charBeforeA || char === "a") {
        Ss.push(point)
      } else if (char === charAfterZ) {
        E = point
      }

      if (i > 0) {
        const diff = lines[i - 1][j].charCodeAt(0) - charCode
        if (diff <= 1) {
          graph[point][JSON.stringify([i - 1, j])] = 1
        }
      }

      if (i < lines.length - 1) {
        const diff = lines[i + 1][j].charCodeAt(0) - charCode
        if (diff <= 1) {
          graph[point][JSON.stringify([i + 1, j])] = 1
        }
      }

      if (j > 0) {
        const diff = line[j - 1].charCodeAt(0) - charCode
        if (diff <= 1) {
          graph[point][JSON.stringify([i, j - 1])] = 1
        }
      }

      if (j < line.length - 1) {
        const diff = line[j + 1].charCodeAt(0) - charCode
        if (diff <= 1) {
          graph[point][JSON.stringify([i, j + 1])] = 1
        }
      }
    })
  })

  return Ss.map(S => graph.getShortestDistance(S, E)).min()
}

module.exports = { part1, part2 }
