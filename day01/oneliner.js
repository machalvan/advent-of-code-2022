$("pre")
  .innerHTML.trim()
  .split("\n\n")
  .map(block =>
    block
      .split("\n")
      .map(str => +str)
      .reduce((a, b) => a + b, 0)
  )
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce(([part1, part2], num) => [Math.max(part1, num), part2 + num], [0, 0])
