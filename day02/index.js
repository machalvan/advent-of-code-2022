const { readFileSync } = require("fs")
require("../utils")

const part1 = input => {
  const moves = { x: 1, y: 2, z: 3 }
  const lines = input.toLines()
  let res = 0

  for (let line of lines) {
    const [opp, you] = line.split(" ")

    if (opp === "A") {
      if (you === "X") {
        // Tie
        res += moves.x + 3
      } else if (you === "Y") {
        // Win
        res += moves.y + 6
      } else if (you === "Z") {
        // Lose
        res += moves.z + 0
      }
    } else if (opp === "B") {
      if (you === "X") {
        // Lose
        res += moves.x + 0
      } else if (you === "Y") {
        // Tie
        res += moves.y + 3
      } else if (you === "Z") {
        // Win
        res += moves.z + 6
      }
    } else if (opp === "C") {
      if (you === "X") {
        // Win
        res += moves.x + 6
      } else if (you === "Y") {
        // Lose
        res += moves.y + 0
      } else if (you === "Z") {
        // Tie
        res += moves.z + 3
      }
    }
  }

  return res
}

const part2 = input => {
  const moves = { x: 1, y: 2, z: 3 }
  const lines = input.toLines()
  let res = 0

  for (let line of lines) {
    const [opp, you] = line.split(" ")

    if (opp === "A") {
      if (you === "X") {
        // Lose
        res += moves.z + 0
      } else if (you === "Y") {
        // Draw
        res += moves.x + 3
      } else if (you === "Z") {
        // Win
        res += moves.y + 6
      }
    } else if (opp === "B") {
      if (you === "X") {
        // Lose
        res += moves.x + 0
      } else if (you === "Y") {
        // Draw
        res += moves.y + 3
      } else if (you === "Z") {
        // Win
        res += moves.z + 6
      }
    } else if (opp === "C") {
      if (you === "X") {
        // Lose
        res += moves.y + 0
      } else if (you === "Y") {
        // Draw
        res += moves.z + 3
      } else if (you === "Z") {
        // Win
        res += moves.x + 6
      }
    }
  }

  return res
}

const input = readFileSync("input.txt", "utf8").trim()
console.log(part1(input))
console.log(part2(input))
