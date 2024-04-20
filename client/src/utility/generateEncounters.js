import { calculateChallengeRating } from './challengeCalcs';

export function generateEncounters(monsters, partyLevel) {
    const { minCR, maxCR } = calculateChallengeRating(partyLevel);
    const suitableMonsters = monsters.filter(monster => monster.cr >= minCR && monster.cr <= maxCR);

    // simplified random selection. probably going to just refactor in EncounterDisplay tbh
    const randomIndex = Math.floor(Math.random() * suitableMonsters.length);
    const encounter = suitableMonsters[randomIndex] ? [suitableMonsters[randomIndex]] : [];
    return encounter;
}
