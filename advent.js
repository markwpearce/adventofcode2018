const readline = require("readline");
const fs = require("fs");
const program = require('commander');


function log(message) {
  if (program.verbose) {
    console.log(message);
  }
}


program
  .option('-i, --input [filename]', 'Set input filename')
  .option('-v, --verbose [filename]', 'Verbosity')
  .parse(process.argv);

if (!program.input) {
  console.error("Add input file");
  process.exit();
}

log(`Using input file ${program.input}`);

const numbers = [];

const rl = readline.createInterface({
  input: fs.createReadStream(program.input)
});

rl.on("line", function(line) {
  const num = parseInt(line, 10);
  log(num);
  numbers.push(num);
});

rl.on("close", function() {
  const inputTotal = numbers.reduce((total, val) => { return total + val; }, 0);
  log("Result:")
  console.log(inputTotal);
});