const Day = require("./day").Day;
const Puzzle5_1 = require("./5-1").puzzle;
const vlog = require("../util/vlog");

const LETTERS = "abcdfefghijklmnopqrstuvwxyz";

class Puzzle5_2 extends Day {

  run(input) {
    const removedLetterReactionSize = {};
    const fiveOnePuzzle = new Puzzle5_1();
    let minSize = input[0].length;
    let minLetter = '';
    LETTERS.split('').forEach((letter) => {
      const regExp = new RegExp(`[${letter}${letter.toUpperCase()}]`, 'g');
      vlog(`Removing ${letter} with RegExp ${regExp}`);
      const polymer = input[0].replace(regExp, '')
      vlog(polymer);
      const size = fiveOnePuzzle.run([polymer]);
      if (size < minSize) {
        minLetter = letter;
        minSize = size;
      }
      removedLetterReactionSize[letter] = size;
      vlog(`Removing ${letter} => ${removedLetterReactionSize[letter]}`)
    });

    vlog(removedLetterReactionSize);
    vlog(`Smallest is removing ${minLetter} for ${minSize}`);
    return minSize;
  }

}

module.exports = { puzzle: Puzzle5_2 };