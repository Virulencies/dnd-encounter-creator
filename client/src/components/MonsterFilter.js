import React, { useState } from 'react';

function MonsterFilter({ onFilterChange }) {
  const [type, setType] = useState('');
  const [cr, setCr] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ type, cr });
  };

  return (
    <div>
      <div>
        <label>Monster Type:</label>
        <input type="text" value={type} onChange={e => setType(e.target.value)} placeholder="Type (e.g., dragon)" />
      </div>
      <div>
        <label>Challenge Rating:</label>
        <input type="text" value={cr} onChange={e => setCr(e.target.value)} placeholder="CR (e.g., 7)" />
      </div>
      <button onClick={handleFilterChange}>Filter Monsters</button>
    </div>
  );
}

export default MonsterFilter;
