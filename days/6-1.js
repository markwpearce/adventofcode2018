const Day = require("./day").Day;
const vlog = require("../util/vlog");
const md = require("../util/manhattanDistance");
const planeIterator = require("../util/planeIterator");
const manhattanSpiral = require("../util/manhattanSpiral");

class Puzzle6_1 extends Day {

  constructor() {
    super();
    this.min = { x: 1000, y: 1000 };
    this.max = { x: 0, y: 0 };
    this.nextLocationId = 65;
    this.gridSize = { x: 0, y: 0 };
    this.grid = [];
    this.results = {};
  }

  parseLine(line) {
    const matches = line.match(/^(\d*)[, ]+(\d*)$/);
    if (matches.length !== 3) {
      throw `Could not parse x and y values`;
    }
    const location = {
      id: String.fromCharCode(this.nextLocationId++),
      x: parseInt(matches[1], 10),
      y: parseInt(matches[2], 10)
    };

    this.min = { x: Math.min(this.min.x, location.x), y: Math.min(this.min.y, location.y) }
    this.max = { x: Math.max(this.max.x, location.x), y: Math.max(this.max.y, location.y) }
    return location;
  }

  setupResults(input) {
    this.results = {};
    input.forEach(inputItem => {
      this.results[inputItem.id] = { size: 0, infinite: this.testForGridLimit(inputItem) };
    });
  }

  setupGrid(input) {
    this.gridSize = { x: this.max.x - this.min.x + 1, y: this.max.y - this.min.y + 1 };
    this.grid = [];
    planeIterator(0, 0, this.gridSize.x, this.gridSize.y, (i, j) => {
      this.grid[i] = this.grid[i] || [];
      this.grid[i][j] = '.';
    })
    input.forEach(element => {
      this.setGridChar(element, element.id);
    });

    vlog(`Grid size: ${this.gridSize.x}, ${this.gridSize.y}`);
  }

  setGridChar(p, c) {
    // vlog(`setting ${p.x - this.min.x} ${p.y - this.min.y} to ${c}`);
    this.grid[p.x - this.min.x][p.y - this.min.y] = c;
  }

  displayGrid() {
    if (!program.verbose) {
      return;
    }
    let curLine = "";
    planeIterator(0, 0, this.gridSize.x, this.gridSize.y, (i, j) => {
      curLine += this.grid[i][j];
    }, true, () => {
      vlog(curLine);
      curLine = "";
    })
  }

  testForGridLimit(inputItem) {
    const limit = inputItem.x === this.min.x ||
      inputItem.y === this.min.y ||
      inputItem.x === this.max.x ||
      inputItem.y === this.max.y;
    if (limit && inputItem.id) {
      vlog(`${inputItem.id} is at limit`);
    }
    return limit;
  }

  testItem(inputItem, input) {
    vlog(inputItem);
    if (this.results[inputItem.id].infinite) {
      return;
    }
    input = input.filter(a => a.id != inputItem.id).sort((a, b) => md(inputItem, a) - md(inputItem, b));
    let lastSpiral = 0;
    let foundInLastSpiral = 1;
    manhattanSpiral(inputItem, (x, y, spiralNum) => {
      let i = 0;
      let foundCloser = false;
      const p = { x, y };
      let minDistance = md(inputItem, p);
      if (spiralNum > lastSpiral) {
        this.results[inputItem.id].size += foundInLastSpiral;
        if (foundInLastSpiral === 0) {
          return true;
        }
        foundInLastSpiral = 0;
        lastSpiral = spiralNum;
      }

      while (i < input.length && !foundCloser) {
        foundCloser = (md(input[i], p) <= minDistance);
        i++;
      }
      if (!foundCloser) {
        if (this.testForGridLimit(p)) {
          vlog(inputItem.id + " is infinite");
          this.results[inputItem.id].infinite = true;
          return true;
        } else {
          foundInLastSpiral++;
          this.setGridChar(p, inputItem.id);
        }
      }
      return false;

    });
  }

  run(input) {
    this.setupGrid(input);
    this.setupResults(input);
    input.forEach((item) => this.testItem(item, [...input]));
    this.displayGrid(input);
    vlog(this.results);
    const biggest = Math.max(...(Object.values(this.results).filter(item => !item.infinite).map(item => item.size)));
    vlog(`Largest group has size ${biggest}`);
    return biggest;
  }

}


module.exports = { puzzle: Puzzle6_1 };