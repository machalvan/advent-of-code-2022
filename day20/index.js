require("../utils")()

const part1 = input => {
  const nums = input.toLines().toNumbers()

  let numObj = nums.reduce((acc, _, i) => {
    acc[i] = i
    return acc
  }, {})

  let newNumObj = { ...numObj }
  for (let oldIndex = 0; oldIndex < nums.length; oldIndex++) {
    const num = nums[oldIndex]
    if (num === 0) continue

    const newIndex = numObj[oldIndex]
    let newPos = newIndex + num

    let mod = Math.abs(newPos % (nums.length - 1))
    newPos = newPos <= 0 ? nums.length - 1 - mod : mod

    loop(nums.length, i => {
      if (i === oldIndex) {
        newNumObj[i] = newPos
      }

      if (newIndex > newPos) {
        if (numObj[i] >= newPos && numObj[i] < newIndex) {
          newNumObj[i] += 1
        }
      } else {
        if (numObj[i] > newIndex && numObj[i] <= newPos) {
          newNumObj[i] -= 1
        }
      }
    })

    numObj = { ...newNumObj }
  }

  let newNums = []
  for (let i = 0; i < nums.length; i++) {
    newNums[numObj[i]] = nums[i]
  }

  const zeroIndex = newNums.indexOf(0)

  return (
    newNums[(zeroIndex + 1000) % newNums.length] +
    newNums[(zeroIndex + 2000) % newNums.length] +
    newNums[(zeroIndex + 3000) % newNums.length]
  )
}

const part2 = input => {
  let nums = input.toLines().toNumbers()
  const decKey = 811589153
  nums = nums.map(num => num * decKey)

  let numObj = nums.reduce((acc, _, i) => {
    acc[i] = i
    return acc
  }, {})

  loop(10, () => {
    let newNumObj = { ...numObj }
    for (let oldIndex = 0; oldIndex < nums.length; oldIndex++) {
      const num = nums[oldIndex]
      if (num === 0) continue

      const newIndex = numObj[oldIndex]
      let newPos = newIndex + num

      let mod = Math.abs(newPos % (nums.length - 1))
      newPos = newPos <= 0 ? nums.length - 1 - mod : mod

      loop(nums.length, i => {
        if (i === oldIndex) {
          newNumObj[i] = newPos
        }

        if (newIndex > newPos) {
          if (numObj[i] >= newPos && numObj[i] < newIndex) {
            newNumObj[i] += 1
          }
        } else {
          if (numObj[i] > newIndex && numObj[i] <= newPos) {
            newNumObj[i] -= 1
          }
        }
      })

      numObj = { ...newNumObj }
    }
  })

  let newNums = []
  for (let i = 0; i < nums.length; i++) {
    newNums[numObj[i]] = nums[i]
  }

  const zeroIndex = newNums.indexOf(0)

  return (
    newNums[(zeroIndex + 1000) % newNums.length] +
    newNums[(zeroIndex + 2000) % newNums.length] +
    newNums[(zeroIndex + 3000) % newNums.length]
  )
}

module.exports = { part1, part2 }
