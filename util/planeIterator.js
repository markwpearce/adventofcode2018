const vlog = require("../util/vlog");

function planeIterator(iBegin, jBegin, iSize, jSize, func) {
  const iEnd = iBegin + iSize;
  const jEnd = jBegin + jSize;

  vlog(`Plane iterator ${iBegin},${jBegin} to ${iEnd},${jEnd}`)

  for (let i = iBegin; i < iEnd; i++) {
    for (let j = jBegin; j < jEnd; j++) {
      func(i, j);
    }
  }
}

module.exports = planeIterator;