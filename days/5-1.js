const Day = require("./day").Day;
const vlog = require("../util/vlog");
const stringSplice = require('../util/stringSplice')

const ASCII_CASE_DIFF = 32;

class Puzzle5_1 extends Day {
  iteratePolymer(polymer, funcOnReaction) {
    for (let i = 0; i < polymer.length - 1; i++) {
      const current = polymer.charCodeAt(i)
      const next = polymer.charCodeAt(i + 1)
      const diff = Math.abs(current - next)
      vlog(`${i}/${polymer.length}`);
      if (diff === ASCII_CASE_DIFF) {
        polymer = funcOnReaction(polymer, i);
        i = (i < 2) ? -1 : i - 2;
      }
    }
    return polymer;
  }

  run(input) {
    const polymer = this.iteratePolymer(input[0], (poly, i) => stringSplice(poly, i, 2));

    vlog(polymer);

    // check
    this.iteratePolymer(polymer, () => {
      throw `Uncaught pair at ${i}!`
    });

    return polymer.length;
  }

}

module.exports = { puzzle: Puzzle5_1 };