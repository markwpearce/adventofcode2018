const Puzzle3_1 = require("./3-1").puzzle;
const vlog = require("../util/vlog");
const planeIterator = require("../util/planeIterator");


class Puzzle3_2 extends Puzzle3_1 {

  constructor() {
    super();
    this.dupedSwatches = {};
  }


  checkFabricSpot(element, i, j) {

    if (this.fabric[i][j] !== 0) {
      this.dupedSwatches[this.fabric[i][j]] = true;
      this.dupedSwatches[element.number] = true;

    }
    this.fabric[i][j] = element.number;
    vlog(`Setting ${i},${j} to ${this.fabric[i][j]}`);
  }


  getReturnValue() {
    let undupedSwatch;
    for (const key in this.dupedSwatches) {
      if (this.dupedSwatches.hasOwnProperty(key)) {
        const duped = this.dupedSwatches[key];
        if (!duped) {
          if (undupedSwatch) {
            throw `Multiple unduped swatches: ${undupedSwatch} & ${key}`;
          }
          undupedSwatch = key;
        }
      }
    }
    return undupedSwatch;
  }

  run(lines) {
    lines.forEach(element => this.dupedSwatches[element.number] = false);
    return super.run(lines);
  }


}

module.exports = { puzzle: Puzzle3_2 };