// HELPER FUNCTIONS

function doesArrayContainItem(arr, itemInQuestion) {
  let itemPresent = false;

  arr.forEach((arrItem) => {
    if (arrItem === itemInQuestion) {
      itemPresent = true;
    }
  });

  return itemPresent;
}

function doesArrayContainAllItems(haystack, needles) {
  if (needles.length === 0) {
    return true;
  }
  return needles.every((value) => haystack.indexOf(value) >= 0);
}

module.exports = { doesArrayContainAllItems, doesArrayContainItem };
