import { useState } from 'react';

const filterList = ['All', 'Mine', 'Attack', 'Rescue', 'Scouting', 'Spying'];

export default function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState('All');

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter);
    changeFilter(newFilter);
  };

  return (
    <div className='project-filter'>
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? 'active' : ''}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
