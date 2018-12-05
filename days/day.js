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


class LetterDay {
  parseLine(line) {
    return line.split("");
  }
}

module.exports = { Day, NumberDay, LetterDay };