const Puzzle4_1 = require("./4-1").puzzle;
const vlog = require("../util/vlog");
const indexOfMax = require("../util/indexOfMax");

class Puzzle4_2 extends Puzzle4_1 {


  run(input) {
    input = this.prepareInput(input);
    vlog(input);
    const data = this.getCompleteData(input);
    if (program && program.verbose) {
      this.printDayData(data);
    }
    let mostSleptMinute = -1;
    let mostSleeps = -1;
    let sleepingGuardId = -1;

    for (const gid in data) {
      if (data.hasOwnProperty(gid)) {
        const guardData = data[gid];
        const totalSleeps = this.getTotalMinutesSleptArray(guardData);
        const index = indexOfMax(totalSleeps);
        if (totalSleeps[index] > mostSleeps) {

          mostSleptMinute = index;
          mostSleeps = totalSleeps[index];
          sleepingGuardId = gid;
        }

      }
    }
    vlog(`Sleepiest Guard: ${sleepingGuardId}, and most slept minute: ${mostSleptMinute}`);


    return sleepingGuardId * mostSleptMinute;
  }


}

module.exports = { puzzle: Puzzle4_2 };