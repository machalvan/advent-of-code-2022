require("../utils")()

const evaluate = (tree, key, isPart2 = false) => {
  if (key === "humn" && isPart2) return "humn"
  if (typeof tree[key] === "number") return tree[key]

  const [first, op, last] = tree[key]

  let exp =
    "(" +
    evaluate(tree, first, isPart2) +
    op +
    evaluate(tree, last, isPart2) +
    ")"

  try {
    exp = eval(exp)
  } catch (e) {}

  return exp
}

const getOppositeOp = op => {
  switch (op) {
    case "+":
      return "-"
    case "-":
      return "+"
    case "*":
      return "/"
    case "/":
      return "*"
  }
}

const simplify = exp => {
  const firstParen = exp.indexOf("(")
  const lastParen = exp.lastIndexOf(")")

  if (firstParen === 0 && lastParen === exp.length - 1) {
    return simplify(exp.slice(1, exp.length - 1))
  }

  if (firstParen === -1 && lastParen === -1) {
    const h = exp.indexOf("h")
    const n = exp.lastIndexOf("n")

    if (h === 0) {
      const middle = exp[n + 1]
      const last = exp.slice(n + 1 + 1)

      return getOppositeOp(middle) + last
    } else {
      const middle = exp[h - 1]
      const first = exp.slice(0, h - 1)

      return getOppositeOp(middle) + first
    }
  }

  if (firstParen === 0) {
    const first = exp.slice(1, lastParen)
    const op = exp[lastParen + 1]
    const last = exp.slice(lastParen + 1 + 1)

    if (op === "=") return last + simplify(first)

    return getOppositeOp(op) + last + ")" + simplify(first)
  } else if (lastParen === exp.length - 1) {
    const last = exp.slice(firstParen)
    const op = exp[firstParen - 1]
    const first = exp.slice(0, firstParen - 1)

    if (op === "=") return first + simplify(last)

    if (op === "/") {
      return "**-1" + getOppositeOp(op) + first + ")" + simplify(last)
    } else if (op === "-") {
      return "*-1" + getOppositeOp(op) + first + ")" + simplify(last)
    }

    return getOppositeOp(op) + first + ")" + simplify(last)
  }
}

const part1 = input => {
  const tree = input.toLines().reduce((acc, cur) => {
    let [mon, val] = cur.split(": ")
    val = val.split(" ").map(v => (isNaN(v) ? v : parseInt(v)))
    val = val.length === 1 ? val[0] : val
    acc[mon] = val
    return acc
  }, {})

  const exp = evaluate(tree, "root")
  return eval(exp)
}

const part2 = input => {
  const tree = input.toLines().reduce((acc, cur) => {
    let [mon, val] = cur.split(": ")
    val = val.split(" ").map(v => (isNaN(v) ? v : parseInt(v)))
    val = val.length === 1 ? val[0] : val
    val[1] = mon === "root" ? "=" : val[1]
    acc[mon] = val
    return acc
  }, {})

  const exp = evaluate(tree, "root", true)
  const simple = simplify(exp)
  const solveForRoot = "(".repeat(simple.split(")").length - 1) + simple

  return eval(solveForRoot)
}

module.exports = { part1, part2 }
