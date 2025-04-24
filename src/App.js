import React from 'react';
import RepoCharts from './components/RepoCharts';

function App() {
  return (
    <div className="App">
      <header style={headerStyle}>
        <h1> GitHub Repo Analytics Dashboard - Assignment 5</h1>
      </header>
      <main style={{ padding: '2rem' }}>
        <RepoCharts />
      </main>
    </div>
  );
}

const headerStyle = {
  backgroundColor: '#282c34',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
};

export default App;