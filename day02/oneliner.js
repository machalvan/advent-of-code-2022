$("pre")
  .innerHTML.trim()
  .split("\n")
  .reduce(
    ([part1, part2], line) => [
      part1 +
        {
          X: { A: 4, B: 1, C: 7 },
          Y: { A: 8, B: 5, C: 2 },
          Z: { A: 3, B: 9, C: 6 },
        }[line[2]][line[0]],
      part2 +
        {
          X: { A: 3, B: 1, C: 2 },
          Y: { A: 4, B: 5, C: 6 },
          Z: { A: 8, B: 9, C: 7 },
        }[line[2]][line[0]],
    ],
    [0, 0]
  )
