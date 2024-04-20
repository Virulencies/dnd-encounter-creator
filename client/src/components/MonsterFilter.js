import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


function MonsterFilter({ onFilterChange }) {
  const [type, setType] = useState('');
  const [cr, setCr] = useState('');
  const [partyLevel, setPartyLevel] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = async () => {
    setLoading(true);
    try {
      const results = await onFilterChange({ type, cr });
      if (results && results.length > 0) {
        setMonsters(results);
        setNoResults(false);
      } else {
        setMonsters([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching monsters:', error);
      setMonsters([]);
      setNoResults(true);
    }
    setLoading(false);
  };

  const handleGenerateEncounter = () => {
    navigate('/generate-encounter', { state: { type, cr, partyLevel } });
  };

  return (
    <div>
      {loading ? (
        <p>Finding Monsters...</p>
      ) : (
        <>
          <div className="form-group">
            <label>Monster Type:</label>
            <input type="text" value={type} onChange={e => setType(e.target.value)} placeholder="Type (e.g., dragon)" />
          </div>
          <div className="form-group">
            <label>Challenge Rating:</label>
            <input type="text" value={cr} onChange={e => setCr(e.target.value)} placeholder="CR (e.g., 7)" />
            <button onClick={handleFilterChange}>Filter Monsters</button>
          </div>
          <div className="form-group">
            <label>Party Level:</label>
            <input type="text" value={partyLevel} onChange={e => setPartyLevel(e.target.value)} placeholder="Party Level (e.g., 5)" />
            <button onClick={handleGenerateEncounter}>Generate Encounter</button>
          </div>
          <div className="results">
            {monsters.length > 0 ? (
              monsters.map(monster => (
                <div key={monster.slug}>{monster.name} - CR: {monster.cr}</div>
              ))
            ) : noResults ? (
              <p>No monsters found within range.</p>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

MonsterFilter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
  };
  

export default MonsterFilter;
