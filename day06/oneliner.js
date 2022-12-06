$("pre")
  .innerHTML.trim()
  .split("")
  .reduce(
    ([part1, part2], _, i, arr) => [
      part1 || (new Set(arr.slice(i - 4, i)).size === 4 && i),
      part2 || (new Set(arr.slice(i - 14, i)).size === 14 && i),
    ],
    [0, 0]
  )
