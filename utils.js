// Array

Array.prototype.min = function () {
  return Math.min(...this)
}

Array.prototype.max = function () {
  return Math.max(...this)
}

Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0)
}

Array.prototype.prod = function () {
  return this.reduce((a, b) => a * b, 0)
}

Array.prototype.sortAsc = function () {
  return this.sort((a, b) =>
    typeof a === "string" ? a.localeCompare(b) : a - b
  )
}

Array.prototype.sortDesc = function () {
  return this.sort((a, b) =>
    typeof a === "string" ? b.localeCompare(a) : b - a
  )
}

Array.prototype.toNumbers = function () {
  return this.map(str => +str)
}

Array.prototype.intersection = function () {
  return this.filter(str => arguments[0].includes(str))
}

// String

String.prototype.toList = function () {
  return this.split("")
}

String.prototype.toLines = function () {
  return this.split("\n")
}

String.prototype.toBlocks = function () {
  return this.split("\n\n").map(block => block.toLines())
}

String.prototype.isUpperCase = function () {
  "use strict"
  return this === this.toUpperCase()
}
