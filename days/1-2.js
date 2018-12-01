const frequencies = {};



function run(numbers) {
  let foundDupe = false;
  let firstDupe = -9999;
  let frequency = 0;
  while (!foundDupe) {
    for (let i = 0; i < numbers.length && !foundDupe; i++) {
      frequency += numbers[i];
      foundDupe = (frequencies[frequency]);
      frequencies[frequency] = 1;
      firstDupe = frequency;
    }
  }
  return firstDupe;
}

module.exports = run;