// src/components/RepoCharts.jsx
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

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

export default function RepoCharts() {
  const [repoData, setRepoData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/summary')
      .then(res => res.json())
      .then(data => setRepoData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 space-y-12">
      <h2 className="text-2xl font-bold">📈 GitHub Repository Analytics</h2>

      {/* Line Chart for Issues over time */}
      <h3 className="text-xl font-semibold">Issue Trend (Line Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={repoData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="repo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="issues" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Monthly Issues Bar Chart */}
      <h3 className="text-xl font-semibold">Monthly Issues (Bar Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={repoData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="repo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="monthly_issues" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      {/* Stars Bar Chart */}
      <h3 className="text-xl font-semibold">Stars (Bar Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={repoData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="repo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stars" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>

      {/* Forks Bar Chart */}
      <h3 className="text-xl font-semibold">Forks (Bar Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={repoData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="repo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="forks" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Weekly Issues Closed Bar Chart */}
      <h3 className="text-xl font-semibold">Weekly Closed Issues (Bar Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={repoData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="repo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="weekly_closed_issues" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>

      {/* Stack Bar Chart for Created vs Closed Issues */}
      <h3 className="text-xl font-semibold">Created vs Closed Issues (Stacked Bar)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={repoData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="repo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="created_issues" stackId="a" fill="#0088FE" />
          <Bar dataKey="closed_issues" stackId="a" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
