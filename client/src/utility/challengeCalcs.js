export function calculateChallengeRating(partyLevel) {
    const baseCR = Math.max(1, Math.floor(partyLevel / 4));
    return {
        minCR: baseCR,
        maxCR: baseCR * 2
    };
}
