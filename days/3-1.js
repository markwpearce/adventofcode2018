const Day = require("./day").Day;
const vlog = require("../util/vlog");
const planeIterator = require("../util/planeIterator");


class Puzzle3_1 extends Day {

  constructor() {
    super();
    this.fabric = [];
    this.reusedCode = "X";
    this.maxSize = 1002;
  }

  parseLine(line) {
    vlog(line);
    const matches = line.match(/^#(\d*) @ (\d*),(\d*): (\d*)x(\d*)$/);
    if (matches.length !== 6) {
      throw `Could not parse values`;
    }
    const parsedValues = matches.map(match => parseInt(match, 10));
    return {
      number: parsedValues[1],
      x: parsedValues[2],
      y: parsedValues[3],
      width: parsedValues[4],
      length: parsedValues[5]
    };
  }

  makeFabric(size) {
    this.fabric = [];
    planeIterator(0, 0, size, size, (i, j) => {
      this.fabric[i] = this.fabric[i] || [];
      this.fabric[i][j] = 0;
    })
  }

  checkFabricSpot(element, i, j) {

    if (this.fabric[i][j] !== 0) {
      this.fabric[i][j] = this.reusedCode;
    } else {
      this.fabric[i][j] = element.number;
    }
    vlog(`Setting ${i},${j} to ${this.fabric[i][j]}`);
  }


  getReturnValue() {
    let multiUseSpots = 0;
    planeIterator(0, 0, this.maxSize, this.maxSize, (i, j) => {
      if (this.fabric[i][j] === this.reusedCode) {
        multiUseSpots++;
      }
    });
    return multiUseSpots;
  }


  run(lines) {
    this.makeFabric(this.maxSize);

    lines.forEach(element => {
      vlog(`Processing ${element.number }`);
      planeIterator(element.x, element.y, element.width, element.length, (i, j) => this.checkFabricSpot(element, i, j));
    });
    vlog(this.fabric);
    return this.getReturnValue();

  }
}

module.exports = { puzzle: Puzzle3_1 };