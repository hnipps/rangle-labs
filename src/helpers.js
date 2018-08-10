// HELPER FUNCTIONS

const doesArrayContainItem = (array, itemInQuestion) => {

    let itemPresent = false;

    array.forEach((item) => {
      if (item === itemInQuestion) {
        itemPresent = true;
      }
    });

    return itemPresent;
}

const doesArrayContainAllItems = (haystack, needles) => {
    
    if (needles.length === 0) {
      return true;
    }
    return needles.every((value) => {
      return (haystack.indexOf(value) >= 0);
    });
}

module.exports = { doesArrayContainAllItems, doesArrayContainItem };
