import React from 'react';
import './Charts.css';

export default function Charts({ repo }) {
  return (
    <div className="charts">
      {repo ? (
        <>
          <h2>📈 Charts for {repo}</h2>
          <img src={`http://localhost:5000/images/${repo.replaceAll('/', '__')}_1.png`} alt="Line Chart" />
          <img src={`http://localhost:5000/images/${repo.replaceAll('/', '__')}_2.png`} alt="Bar Chart 1" />
          <img src={`http://localhost:5000/images/${repo.replaceAll('/', '__')}_3.png`} alt="Bar Chart 2" />
        </>
      ) : (
        <div className="placeholder">🌀 Select a repository to view charts</div>
      )}
    </div>
  );
}