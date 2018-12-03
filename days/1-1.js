const NumberDay = require("./day").NumberDay;


class Puzzle11 extends NumberDay {
  run(numbers) {
    return numbers.reduce((total, val) => { return total + val; }, 0);
  }
}


module.exports = new Puzzle11();