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

function sortAgents(agents, sortType) {
  if (sortType === 'alphabetical') {
    agents.sort((agent1, agent2) => {
      if (agent1.firstName < agent2.firstName) {
        return -1;
      }
      return 1;
    })
  } else if (sortType === 'availability') {
    agents.sort((agent1, agent2) => {
      if (agent1.currentFreeAgent) {
        return -1;
      }
      return 1;
    });
  }
  return agents;
}

module.exports = { doesArrayContainAllItems, doesArrayContainItem, sortAgents };
