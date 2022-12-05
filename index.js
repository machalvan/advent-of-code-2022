const { readFileSync } = require("fs")

if (process.argv.length === 2) {
  console.error("Expected an argument.")
  console.error("Usage: node index.js <day>")
  process.exit(1)
}

const dayNumber = process.argv[2]
const day = `day${dayNumber.padStart(2, "0")}`

const input = readFileSync(`${day}/input.txt`, "utf8").trimEnd()

try {
  const { part1, part2 } = require(`./${day}/improved`)
  console.log(part1(input))
  console.log(part2(input))
} catch (_) {
  const { part1, part2 } = require(`./${day}/index`)
  console.log(part1(input))
  console.log(part2(input))
}
