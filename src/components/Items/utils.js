export function manualSort(items, head) {
  const manSortItems = [];
  let currentIndex = head;
  while (items[currentIndex]) {
    manSortItems.push(items[currentIndex]);
    currentIndex = items[currentIndex].next;
  }
  return manSortItems;
}

export function compareAisle(a, b) {
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
