export function splitByType(items) {
  const noAisle = [];
  const stringAisle = [];
  const intAisle = [];
  items.forEach(item => {
    const { aisleNo } = item.aisleLocation;
    if (!aisleNo) {
      noAisle.push(item);
    } else if (!isNaN(aisleNo)) {
      item.aisleLocation.aisleNo = parseInt(item.aisleLocation.aisleNo);
      intAisle.push(item);
    } else {
      stringAisle.push(item);
    }
  });
  return { noAisle, stringAisle, intAisle };
}
function sortByName(item1, item2) {
  if (item1.name === item2.name) {
    return 0;
  }
  for (let i = 0; i < item1.name.length; i++) {
    if (item2.name[i]) {
      if (item1.name[i] > item2.name[i]) {
        return 1;
      }
      if (item2.name[i] > item1.name[i]) {
        return -1;
      }
    } else {
      return 1;
    }
    return -1;
  }
}

export function sortAisle(a, b) {
  if (!a.aisleLocation.aisleNo || !b.aisleLocation.aisleNo) {
    return sortByName(a, b);
  }
  let { aisleNo: aisleA } = a.aisleLocation;
  let { aisleNo: aisleB } = b.aisleLocation;

  if (aisleA > aisleB) {
    return 1;
  } else if (aisleA < aisleB) {
    return -1;
  } else {
    return sortByName(a, b);
  }
}
