const Day = require("./day").Day;
const vlog = require("../util/vlog");
const padNum = require("../util/padNum");
const indexOfMax = require("../util/indexOfMax");


class Puzzle4_1 extends Day {

  parseLine(line) {
    const matches = line.match(/^\[([\d\- :]+)\] ([\w# ]*)$/);
    if (!matches || matches.length !== 3) {
      throw `Could not parse values`;
    }
    return {
      date: new Date(matches[1] + "Z"), // just ignore timezone changes and everything
      message: matches[2]
    };
  }

  getRecordGuardId(recordMessage) {
    const matches = recordMessage.match(/Guard #(\d*) begins shift/);
    if (!matches || matches.length !== 2) {
      return undefined;
    }
    return parseInt(matches[1], 10);
  }

  prepareInput(inputArray) {
    let activeGuardId;
    return inputArray.sort((a, b) => a.date - b.date).map(inputRecord => {
      const record = {...inputRecord };
      record.guardId = this.getRecordGuardId(record.message) || activeGuardId;
      activeGuardId = record.guardId;
      if (!activeGuardId) {
        throw `Unable to determine guard id`;
      }
      // sometimes guards start BEFORE midnight
      // if this is the case, just make the start time midnight
      if (record.message.match(/begins shift/) && record.date.getUTCHours() === 23) {
        record.date.setDate(record.date.getDate() + 1);
        record.date.setUTCHours(0);
        record.date.setUTCMinutes(0);
      }
      return record;
    });
  }

  getCompleteData(input) {
    const data = {};
    let currentDate;
    input.forEach((record, i) => {
      data[record.guardId] = data[record.guardId] || { days: [], sleepTime: 0 };
      const guardData = data[record.guardId];
      const recordDay = this.getDayStr(record.date)
      if (recordDay !== currentDate) {
        const initDay = { date: recordDay, guardId: record.guardId, minutes: Array(60).fill(0) };
        guardData.days.push(initDay);
        currentDate = recordDay;
      }
      const dayData = guardData.days[guardData.days.length - 1];

      if (record.message.match(/wakes/)) {
        const wakeMin = record.date.getUTCMinutes();
        const sleepMin = input[i - 1].date.getUTCMinutes();
        dayData.minutes.fill(1, sleepMin, wakeMin);
        guardData.sleepTime += wakeMin - sleepMin;
      }
    });
    return data;
  }

  getDayStr(d) {
    const dayStr = `${d.getUTCFullYear()}-${padNum(d.getUTCMonth()+1)}-${padNum(d.getUTCDate())}`;
    return dayStr;
  }

  printDayData(data) {
    for (const gid in data) {
      if (data.hasOwnProperty(gid)) {
        const guardData = data[gid];
        guardData.days.forEach(day => {
          vlog(`${day.date} #${padNum(day.guardId)} ${day.minutes.join('')}`);
        });
      }
    }
  }


  getSleepiestGuardId(data) {
    let maxSleep = -1;
    let sleepiestGuard = -1;
    for (const gid in data) {
      if (data.hasOwnProperty(gid)) {
        const guardData = data[gid];
        vlog(`Guard #${gid} sleeped ${guardData.sleepTime}`);
        if (guardData.sleepTime === maxSleep) {
          console.log(`Warning: guards ${gid} and ${sleepiestGuard} slept the same amount (${maxSleep})`)
        }

        if (guardData.sleepTime > maxSleep) {
          sleepiestGuard = gid;
          maxSleep = guardData.sleepTime;
        }
      }
    }
    return sleepiestGuard;
  }

  getTotalMinutesSleptArray(guardData) {
    return guardData.days.reduce((sleptSoFar, day) => {
      return sleptSoFar.map((slept, i) => slept + day.minutes[i]);
    }, Array(60).fill(0));
  }

  findMostSleptMinute(guardData) {
    return indexOfMax(this.getTotalMinutesSleptArray(guardData));
  }

  run(input) {
    input = this.prepareInput(input);
    vlog(input);
    const data = this.getCompleteData(input);
    if (program && program.verbose) {
      this.printDayData(data);
    }
    const sleepiestGuardId = this.getSleepiestGuardId(data);
    const mostSleptMinute = this.findMostSleptMinute(data[sleepiestGuardId]);
    vlog(`Sleepiest Guard: ${sleepiestGuardId}, and most slept minute: ${mostSleptMinute}`);


    return sleepiestGuardId * mostSleptMinute;
  }


}


module.exports = { puzzle: Puzzle4_1 };