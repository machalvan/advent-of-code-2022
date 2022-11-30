// Array
Array.prototype.min = function () {
  return Math.min(...this);
};

Array.prototype.max = function () {
  return Math.max(...this);
};

Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0);
};

Array.prototype.sortAsc = function () {
  return this.sort((a, b) =>
    typeof a === "string" ? a.localeCompare(b) : a - b
  );
};

Array.prototype.sortDesc = function () {
  return this.sort((a, b) =>
    typeof a === "string" ? b.localeCompare(a) : b - a
  );
};

Array.prototype.toNumbers = function () {
  return this.map(str => +str);
};

// String
String.prototype.parseLines = function () {
  return this.split("\n");
};

String.prototype.parseNumberLines = function () {
  return this.split("\n").toNumbers();
};

String.prototype.parseBlocks = function () {
  return this.split("\n\n").map(block => block.parseLines());
};

String.prototype.parseNumberBlocks = function () {
  return this.split("\n\n").map(block => block.parseNumberLines());
};
