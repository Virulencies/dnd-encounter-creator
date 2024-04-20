import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMonsters } from '../services/Api';

function EncountersDisplay() {
    const location = useLocation();
    const { type, partyLevel } = location.state || { type: '', partyLevel: '' };
    const [encounter, setEncounter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [noEncounterFound, setNoEncounterFound] = useState(false);
    const navigate = useNavigate();

    function getMonstersByCR(monsters, cr) {
        return monsters.filter(monster => monster.cr === parseInt(cr, 10));
    }

    function generateRandomEncounter(monsters, numPlayers) {
        if (monsters.length === 0) {
            console.error("No monsters found for the given CR.");
            return null;
        }
        const monster = monsters[Math.floor(Math.random() * monsters.length)];
        const numMonsters = calculateMonstersNumber(numPlayers);

        console.log(`Encounter generated with ${numMonsters} x ${monster.name} (CR: ${monster.cr})`);
        return {
            monster: monster,
            count: numMonsters
        };
    }

    function calculateMonstersNumber(numPlayers) {
        if (numPlayers <= 3) return 1;
        if (numPlayers <= 5) return 2;
        return 3;  //difficulty adjustment
    }

    useEffect(() => {
        const fetchAndGenerateEncounter = async () => {
            setLoading(true);
            setNoEncounterFound(false);
            try {
                const allMonsters = await fetchMonsters();
                const filteredMonsters = type ? getMonstersByCR(allMonsters.filter(monster => monster.type.toLowerCase() === type.toLowerCase()), partyLevel) : allMonsters;
                const generatedEncounter = generateRandomEncounter(filteredMonsters, 4); // Assume base 4 players or get this from user input
                if (generatedEncounter) {
                    setEncounter(generatedEncounter);
                } else {
                    setNoEncounterFound(true);
                }
            } catch (error) {
                console.error("Failed to fetch or generate encounter:", error);
                setNoEncounterFound(true);
            }
            setLoading(false);
        };

        fetchAndGenerateEncounter();
    }, [type, partyLevel]);

    return (
        <div>
            <h2>Generated Encounter</h2>
            {loading ? (
                <p>Building Encounter...</p>
            ) : noEncounterFound ? (
                <p>No appropriate encounters within specified range.</p>
            ) : encounter ? (
                <div>{`${encounter.count} x ${encounter.monster.name} (CR: ${encounter.monster.cr})`}</div>
            ) : (
                <p>No encounters generated.</p>
            )}
            <button onClick={() => navigate('/')}>New Encounter</button>
        </div>
    );
}

export default EncountersDisplay;
