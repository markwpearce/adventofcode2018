function run(numbers) {
  return numbers.reduce((total, val) => { return total + val; }, 0);
}

module.exports = run;