const Day = require("./day").Day;
const vlog = require("../util/vlog");

class Puzzle21 extends Day {

  run(lines) {
    const checksumValue = { two: 0, three: 0 };

    lines.forEach(line => {
      vlog([...line]);
      const letterCounts = [...line].reduce((soFar, letter) => {
        soFar[letter] = soFar[letter] ? soFar[letter] : 0;
        soFar[letter]++;
        return soFar;
      }, {});
      let foundTwo = false,
        foundThree = false;
      for (const key in letterCounts) {
        if (letterCounts.hasOwnProperty(key)) {
          const count = letterCounts[key];
          if (count === 2 && !foundTwo) {
            checksumValue.two++;
            foundTwo = true;
          }
          if (count === 3 && !foundThree) {
            checksumValue.three++;
            foundThree = true;
          }

        }
      };
    });
    return checksumValue.two * checksumValue.three;
  }
}

module.exports = new Puzzle21();