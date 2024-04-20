import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMonsters } from '../services/Api';
//import { generateEncounters } from '../utility/generateEncounters';

function EncountersDisplay() {
    const location = useLocation();
    const { type, partyLevel } = location.state || { type: '', partyLevel: '' };
    const [encounter, setEncounter] = useState(null);
  
    // get monsters by CR
    function getMonstersByCR(monsters, cr) {
      return monsters.filter(monster => monster.cr === parseInt(cr, 10));
    }
  
    // refactored utility function to generate random encounter based on CR and number of players
    function generateEncounter(monsters, cr, numPlayers) {
      const monstersByCR = getMonstersByCR(monsters, cr);
      if (monstersByCR.length === 0) {
        console.error("No monsters found for the given CR.");
        return null;
      }
      //refactored randomizer. Move back to utility?
      const monster = monstersByCR[Math.floor(Math.random() * monstersByCR.length)];
      const numMonsters = calculateMonstersNumber(numPlayers);
      
      console.log(`Encounter generated with ${numMonsters} x ${monster.name} (CR: ${monster.cr})`);
      return {
        monster: monster,
        count: numMonsters
      };
    }
  
    // calculate the number of monsters based on number of players
    function calculateMonstersNumber(numPlayers) {
      if (numPlayers <= 3) return 1;
      if (numPlayers <= 5) return 2;
      return 3; 
    }
  
    // hook to fetch monsters and genrate encounter
    useEffect(() => {
      const fetchAndGenerateEncounter = async () => {
        try {
          const allMonsters = await fetchMonsters();
          const filteredMonsters = type ? allMonsters.filter(monster => monster.type.toLowerCase() === type.toLowerCase()) : allMonsters;
          const generatedEncounter = generateEncounter(filteredMonsters, partyLevel, 4); // Assume 4 players or get this from user input
          setEncounter(generatedEncounter);
        } catch (error) {
          console.error("Failed to fetch or generate encounter:", error);
        }
      };
  
      fetchAndGenerateEncounter();
    }, [type, partyLevel]);
  
    return (
      <div>
        <h2>Generated Encounter</h2>
        {encounter && (
          <div>{`${encounter.count} x ${encounter.monster.name} (CR: ${encounter.monster.cr})`}</div>
        )}
      </div>
    );
  }
  
  export default EncountersDisplay;