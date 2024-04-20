import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MonsterFilter({ onFilterChange }) {
  const [type, setType] = useState('');
  const [cr, setCr] = useState('');
  const [partyLevel, setPartyLevel] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFilterChange = async () => {
    setLoading(true);
    await onFilterChange({ type, cr });
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
        <div className="form-container">
          <div className="form-group">
          <label>
              <a href="https://5thsrd.org/gamemaster_rules/monster_indexes/monsters_by_type/" target="_blank" rel="noopener noreferrer">
                Monster Type:
              </a>
            </label>
            <input className="input-field" type="text" value={type} onChange={e => setType(e.target.value)} placeholder="Type (e.g., dragon)" />
          </div>
          <div className="form-group">
            <label>Challenge Rating:</label>
            <input className="input-field" type="text" value={cr} onChange={e => setCr(e.target.value)} placeholder="CR (e.g. 7)" />
            <button onClick={handleFilterChange}>Filter Monsters</button>
          </div>
          <div className="form-group">
            <label>Party Level:</label>
            <input className="input-field" type="text" value={partyLevel} onChange={e => setPartyLevel(e.target.value)} placeholder="Party Avg Level (e.g. 5)" />
            <button onClick={handleGenerateEncounter}>Generate Encounter</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonsterFilter;
