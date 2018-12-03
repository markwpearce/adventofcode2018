const Day = require("./day").Day;
const vlog = require("../util/vlog");

class Puzzle22 extends Day {

  removeCharAt(str, i) {
    return str.substring(0, i) + str.substring(i + 1);
  }


  run(lines) {
    let code = "";
    let diffLetterIndex = -1;
    lines.forEach((currentLine, index) => {
      if (index === 0 || code.length > 0) {
        return;
      }
      for (let testIndex = 0; testIndex < index; testIndex++) {
        const testLine = lines[testIndex]
        if (currentLine.length !== testLine.length || code.length > 0) {
          break;
        }
        for (let i = 0; i < currentLine.length; i++) {
          vlog(`Testing: ${currentLine} vs ${testLine}`);
          const modLine = this.removeCharAt(currentLine, i);
          const modTestLine = this.removeCharAt(testLine, i);
          if (modLine === modTestLine) {
            vlog(`Found match! Difference at ${i}`)
            diffLetterIndex = i;
            code = modLine;
            break;
          }
        }
      }

    });
    return code;
  }
}

module.exports = new Puzzle22();