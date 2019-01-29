export function compareAisle(a, b) {
  if (!a.aisleLocation || !b.aisleLocation) {
    return 0;
  }
  let { aisleNo: aisleA } = a.aisleLocation;
  let { aisleNo: aisleB } = b.aisleLocation;
  if (aisleA > aisleB) {
    return 1;
  } else if (aisleA < aisleB) {
    return -1;
  } else {
    return 0;
  }
}

export function sortAisle(a, b) {
  if (!a.aisleLocation || !b.aisleLocation) {
    return 0;
  }
  let { aisleNo: aisleA } = a.aisleLocation;
  let { aisleNo: aisleB } = b.aisleLocation;
  if (!isNaN(aisleA)) {
    aisleA = parseInt(aisleA);
  }
  if (!isNaN(aisleB)) {
    aisleB = parseInt(aisleB);
  }
  if (aisleA > aisleB) {
    return 1;
  } else if (aisleA < aisleB) {
    return -1;
  } else {
    return 0;
  }
}

export function reverseSortAisle(a, b) {
  if (!a.aisleLocation || !b.aisleLocation) {
    return 0;
  }
  let { aisleNo: aisleA } = a.aisleLocation;
  let { aisleNo: aisleB } = b.aisleLocation;
  if (!isNaN(aisleA)) {
    aisleA = parseInt(aisleA);
  }
  if (!isNaN(aisleB)) {
    aisleB = parseInt(aisleB);
  }
  if (aisleA > aisleB) {
    return -1;
  } else if (aisleA < aisleB) {
    return 1;
  } else {
    return 0;
  }
}
