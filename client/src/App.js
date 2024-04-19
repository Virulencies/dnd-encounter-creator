// src/App.js
import React, { useState } from 'react';
import MonsterFilter from './components/MonsterFilter';
import { fetchMonsters } from './services/Api';

function App() {
  const [monsters, setMonsters] = useState([]);

  const handleFilterChange = async (filters) => {
    try {
      // Fetch all monsters without any filter...these will take awhile
      const allMonsters = await fetchMonsters();
      // Convert the 'cr' filter to a number for comparison
      const targetCrValue = parseFloat(filters.cr);
      // Filter the monsters based on 'type' and 'cr'(for now) provided in the filters object
      const filteredMonsters = allMonsters.filter(monster =>
        monster.type.toLowerCase() === filters.type.toLowerCase() && monster.cr === targetCrValue
      );
      setMonsters(filteredMonsters);
    } catch (error) {
      console.error('Failed to fetch monsters:', error);
      // Handle errors
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>D&D Encounter Generator</h1>
      </header>
      <MonsterFilter onFilterChange={handleFilterChange} />
      {/* Display the filtered monsters here, eventually the challenges if i dont give them a page */}
      <main>
        {monsters.map(monster => (
          <div key={monster.slug}>{monster.name} - CR: {monster.cr}</div>
        ))}
      </main>
      <footer>
        <p>© 2024 D&D Tools</p>
      </footer>
    </div>
  );
}

export default App;
