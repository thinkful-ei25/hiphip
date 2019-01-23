export function compareAisle(a, b) {
  if (a.aisleLocation.aisleNo > b.aisleLocation.aisleNo) {
    return 1;
  } else if (a.aisleLocation.aisleNo < b.aisleLocation.aisleNo) {
    return -1;
  } else {
    return 0;
  }
}

export function reverseCompareAisle(a, b) {
  if (a.aisleLocation.aisleNo > b.aisleLocation.aisleNo) {
    return -1;
  } else if (a.aisleLocation.aisleNo < b.aisleLocation.aisleNo) {
    return 1;
  } else {
    return 0;
  }
}
