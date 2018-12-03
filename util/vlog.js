module.exports = function log(message) {
  if (program.verbose) {
    console.log(message);
  }
}