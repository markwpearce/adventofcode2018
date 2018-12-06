const vlog = require("../util/vlog");

function planeIterator(iBegin, jBegin, iSize, jSize, func, pivot, endOfRowFunc) {
  const iEnd = iBegin + iSize;
  const jEnd = jBegin + jSize;

  vlog(`Plane iterator ${iBegin},${jBegin} to ${iEnd},${jEnd}${pivot?' Pivoted':''}`)
  if (!pivot) {
    for (let i = iBegin; i < iEnd; i++) {
      for (let j = jBegin; j < jEnd; j++) {
        func(i, j);
      }
      if (endOfRowFunc) {
        endOfRowFunc(i);
      }
    }
  } else {
    for (let j = jBegin; j < jEnd; j++) {
      for (let i = jBegin; i < iEnd; i++) {
        func(i, j);
      }
      if (endOfRowFunc) {
        endOfRowFunc(j);
      }
    }

  }

}

module.exports = planeIterator;