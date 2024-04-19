export function generateEncounters(monsters, targetCR) {
    let results = [];

    function findEncounters(currentIndex, currentCombo, currentSum) {
        // if the current sum matches the target CR, add the current combination to results
        if (currentSum === targetCR) {
            results.push([...currentCombo]);
            return;
        }

        // if the current sum exceeds the target or we've processed all monsters, return
        if (currentSum > targetCR || currentIndex >= monsters.length) {
            return;
        }

        // include the current monster and move to the next
        currentCombo.push(monsters[currentIndex]);
        findEncounters(currentIndex + 1, currentCombo, currentSum + monsters[currentIndex].cr);

        // exclude the current monster and move to the next
        currentCombo.pop();
        findEncounters(currentIndex + 1, currentCombo, currentSum);
    }

    findEncounters(0, [], 0);
    return results;
}
