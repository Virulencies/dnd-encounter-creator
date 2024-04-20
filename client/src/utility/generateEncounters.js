import { calculateChallengeRating } from './challengeCalcs';

export function generateEncounters(monsters, partyLevel) {
    const { minCR, maxCR } = calculateChallengeRating(partyLevel);
    const suitableMonsters = monsters.filter(monster => monster.cr >= minCR && monster.cr <= maxCR);

    const randomIndex = Math.floor(Math.random() * suitableMonsters.length);
    const encounter = suitableMonsters[randomIndex] ? [suitableMonsters[randomIndex]] : [];
    return encounter;
}

//adjusted this logic and moved within GenerateEncounter.js. Keeping as an alternate method of calculation down the line