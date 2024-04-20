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
    // Navigate to the EncountersDisplay component and pass the necessary data
    navigate('/generate-encounter', { state: { type, cr, partyLevel } });
  };

  return (
    <div>
      {loading ? (
        <p>Finding Monsters...</p>
      ) : (
        <>
          <div>
            <label>Monster Type:</label>
            <input type="text" value={type} onChange={e => setType(e.target.value)} placeholder="Type (e.g., dragon)" />
          </div>
          <div>
            <label>Challenge Rating:</label>
            <input type="text" value={cr} onChange={e => setCr(e.target.value)} placeholder="CR (e.g., 7)" />
          </div>
          <button onClick={handleFilterChange}>Filter Monsters</button>
          <button onClick={handleGenerateEncounter}>Generate Encounter</button>
        </>
      )}
    </div>
  );
}

export default MonsterFilter;
