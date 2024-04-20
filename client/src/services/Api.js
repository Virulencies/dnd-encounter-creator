export async function fetchMonsters(pageUrl = 'https://api.open5e.com/v1/monsters/') {
    let results = [];

    try {
        const response = await fetch(pageUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        results = results.concat(data.results);

        if (data.next) {
            const nextPageResults = await fetchMonsters(data.next);
            results = results.concat(nextPageResults);
        }
        return results;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}
