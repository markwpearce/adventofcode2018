const readline = require("readline");
const fs = require("fs");
const vlog = require("./util/vlog");

program = require('commander');

program
  .option('-i, --input [filename]', 'Set input filename')
  .option('-p, --puzzle [puzzlename]', 'choose what puzzle to load (e.g. 1-1, or 13-2)')
  .option('-v, --verbose', 'Verbose mode on')
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

const lines = [];
const puzzle = require("./days/" + program.puzzle);

const rl = readline.createInterface({
  input: fs.createReadStream(program.input)
});

rl.on("line", function(line) {
  const parsedLine = puzzle.parseLine(line);
  vlog(parsedLine);
  lines.push(parsedLine);
});

rl.on("close", function() {
  const result = puzzle.run(lines);
  vlog("Result:");
  console.log(result);
});