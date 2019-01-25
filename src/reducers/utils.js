function findPrevItemIndex(items, index) {
  let newIndex;
  items.forEach((item, i) => {
    if (item.next === index) {
      newIndex = i;
    }
  });
  return newIndex;
}
export function moveItem(items, itemId, head, down = false) {
  const newItems = items.slice();
  let itemIndex;
  let originalIndex;
  if (!down) {
    newItems.forEach((item, i) => {
      if (item.id === itemId) {
        itemIndex = i;
      }
    });
  } else {
    newItems.forEach((item, i) => {
      if (item.id === itemId) {
        originalIndex = i;
        itemIndex = newItems[i].next;
      }
    });
  }
  if ((!down && itemIndex === head) || (down && !newItems[itemIndex])) {
    return { newItems, head };
  }

  if (newItems[head].next === itemIndex && !down) {
    newItems[head].next = newItems[itemIndex].next;
    newItems[itemIndex].next = head;
    head = itemIndex;
    return { newItems, head };
  }

  if (head === originalIndex && down) {
    newItems[head].next = newItems[itemIndex].next;
    newItems[itemIndex].next = head;
    head = itemIndex;
    return { newItems, head };
  }

  let prevItemIndex = findPrevItemIndex(newItems, itemIndex);
  let prevPrevItemIndex = findPrevItemIndex(newItems, prevItemIndex);
  const newNext = newItems[prevPrevItemIndex].next;
  newItems[prevPrevItemIndex].next = newItems[prevItemIndex].next;
  newItems[prevItemIndex].next = newItems[itemIndex].next;
  newItems[itemIndex].next = newNext;
  return { newItems, head };
}
