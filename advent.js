const readline = require("readline");
const fs = require("fs");


program = require('commander');


vlog = function log(message) {
  if (program.verbose) {
    console.log(message);
  }
}


program
  .option('-i, --input [filename]', 'Set input filename')
  .option('-p, --puzzle [puzzlename]', 'choose what puzzle to load (e.g. 1-1, or 13-2')
  .option('-v, --verbose [filename]', 'Verbosity')
  .parse(process.argv);

if (!program.input) {
  console.error("Input file is required");
  process.exit();
}

if (!program.puzzle) {
  console.error("Puzzle number is required");
  process.exit();
}

vlog(`Using input file ${program.input}`);

const numbers = [];

const rl = readline.createInterface({
  input: fs.createReadStream(program.input)
});

rl.on("line", function(line) {
  const num = parseInt(line, 10);
  vlog(num);
  numbers.push(num);
});

rl.on("close", function() {
  const puzzle = require("./days/" + program.puzzle);
  vlog("Result:");
  console.log(puzzle(numbers));
});