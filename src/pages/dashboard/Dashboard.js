import { useCollection } from '../../hooks/useCollection';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

// components
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';

// styles
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('projects');
  const [filter, setFilter] = useState('All');

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (filter) {
          case 'All':
            return true;
          case 'Mine':
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case 'Attack':
          case 'Rescue':
          case 'Scouting':
          case 'Spying':
            console.log(document.category, filter);
            return document.category === filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectFilter changeFilter={changeFilter} />}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
