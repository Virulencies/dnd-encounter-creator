import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MonsterFilter from './components/MonsterFilter';
import EncountersDisplay from './components/EncountersDisplay'; // For generating encounters
import { fetchMonsters } from './services/Api';
import './App.css';


function App() {
  const [monsters, setMonsters] = useState([]);

  const handleFilterChange = async (filters) => {
    try {
      const allMonsters = await fetchMonsters(); // Assuming this fetches all monsters initially
      const targetCrValue = parseFloat(filters.cr);
      const filteredMonsters = allMonsters.filter(monster =>
        monster.type.toLowerCase() === filters.type.toLowerCase() && monster.cr === targetCrValue
      );
      setMonsters(filteredMonsters);
    } catch (error) {
      console.error('Failed to fetch monsters:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>D&D Encounter Generator</h1>
        </header>
        <Routes>
          <Route path="/" element={
            <>
              <MonsterFilter onFilterChange={handleFilterChange} />
              <main>
              <div className="main-content">
                {monsters.map(monster => (
                  <div key={monster.slug}>{monster.name} - CR: {monster.cr}</div>
                ))}
                </div>
              </main>
            </>
          } />
          <Route path="/generate-encounter" element={<EncountersDisplay />} />
        </Routes>
        <footer className="App-footer">
          <p>© 2024 No Copyright Inc.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
