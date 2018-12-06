const Puzzle6_1 = require("./6-1").puzzle;
const vlog = require("../util/vlog");
const md = require("../util/manhattanDistance");
const planeIterator = require("../util/planeIterator");
const manhattanSpiral = require("../util/manhattanSpiral");

class Puzzle6_2 extends Puzzle6_1 {

  run(input) {
    this.setupGrid(input);
    this.setupResults(input);

    let regionSize = 0;
    let threshold = this.getOptionAsNumber(10000);

    planeIterator(0, 0, this.gridSize.x, this.gridSize.y, (x, y) => {
      const p = { x: x + this.min.x, y: y + this.min.y };
      const d = input.reduce((distance, inputItem) =>
        distance + md(p, inputItem), 0);

      if (d < threshold) {
        vlog(`${x}, ${y} has distance ${d}`);
        if (this.grid[x][y] === '.') {
          this.setGridChar(p, "#");
        }
        regionSize++;
      }
    });
    this.displayGrid(input);
    vlog(`Number of spots with metric less than ${threshold}: ${regionSize}`);
    return regionSize;
  }

}

module.exports = { puzzle: Puzzle6_2 };