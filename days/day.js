class Day {

  parseLine(line) {
    return line;
  }

  run(linesArray) {
    return undefined;
  }

}

class NumberDay {
  parseLine(line) {
    return parseInt(line, 10);
  }
}


module.exports = { Day, NumberDay };