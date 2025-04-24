// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RepoDashboard from './components/RepoDashboard';
import { AiOutlineAreaChart } from 'react-icons/ai';
import './App.css';
import Navbar from './components/Navbar';
const REPOS = [
  'meta-llama/llama3',
  'ollama/ollama',
  'langchain-ai/langchain',
  'langchain-ai/langgraph',
  'microsoft/autogen',
  'openai/openai-cookbook',
  'elastic/elasticsearch',
  'milvus-io/pymilvus'
];

function App() {
  const [selectedRepo, setSelectedRepo] = useState(null);

  return (
    <div className="app-wrapper">
    <Navbar />
    <div className="app">
      <Sidebar repos={REPOS} onSelectRepo={setSelectedRepo} selectedRepo={selectedRepo} />
      <main className="content">
        {selectedRepo ? (
          <RepoDashboard repo={selectedRepo} />
        ) : (
          <div className="placeholder">
            <AiOutlineAreaChart size={40} style={{ marginBottom: '1rem', color: '#4a4a4a' }} />
            <h2>Select a repository to forecast GitHub analytics</h2>
          </div>
        )}
      </main>
    </div>
    </div>
  );
}

export default App;