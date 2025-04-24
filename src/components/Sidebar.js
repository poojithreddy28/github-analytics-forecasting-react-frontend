// src/components/Sidebar.js
import React from 'react';
import { VscRepoForked, VscLibrary } from 'react-icons/vsc';
import './Sidebar.css';

export default function Sidebar({ repos, onSelectRepo, selectedRepo }) {
  return (
    <aside className="sidebar">
      <h2><VscLibrary style={{ marginRight: '8px' }} /> Repositories</h2>
      <ul>
        {repos.map(repo => (
          <li
            key={repo}
            className={selectedRepo === repo ? 'active' : ''}
            onClick={() => onSelectRepo(repo)}
          >
            <VscRepoForked style={{ marginRight: '10px' }} />
            {repo}
          </li>
        ))}
      </ul>
    </aside>
  );
}