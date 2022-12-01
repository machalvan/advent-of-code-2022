const { readFileSync } = require("fs");
require("../utils");

const part1 = input => {
  return input
    .toBlocks()
    .map(block => block.toNumbers().sum())
    .max();
};

const part2 = input => {
  return input
    .toBlocks()
    .map(block => block.toNumbers().sum())
    .sortDesc()
    .slice(0, 3)
    .sum();
};

const input = readFileSync("input.txt", "utf8").trim();
console.log(part1(input));
console.log(part2(input));
