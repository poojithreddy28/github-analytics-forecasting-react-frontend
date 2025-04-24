// src/components/RepoCharts.jsx
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function RepoCharts({ repo }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (repo) {
      fetch(`http://localhost:5000/api/repo?name=${encodeURIComponent(repo)}`)
        .then(res => res.json())
        .then(setData)
        .catch(console.error);
    }
  }, [repo]);

  if (!data) return <div className="p-8">🔄 Select a repository to view charts</div>;

  return (
    <div className="p-8 flex-1 space-y-12 overflow-auto">
      <h2 className="text-2xl font-bold">📊 {repo} — Charts</h2>

      <ChartSection title="Issues Trend (Line)">
        <LineChartComponent data={data} dataKey="issues" />
      </ChartSection>

      <ChartSection title="Monthly Issues (Bar)">
        <BarChartComponent data={data} dataKey="monthly_issues" />
      </ChartSection>

      <ChartSection title="Stars (Bar)">
        <BarChartComponent data={data} dataKey="stars" fill="#ffc658" />
      </ChartSection>

      <ChartSection title="Forks (Bar)">
        <BarChartComponent data={data} dataKey="forks" />
      </ChartSection>

      <ChartSection title="Closed Issues Weekly (Bar)">
        <BarChartComponent data={data} dataKey="weekly_closed_issues" fill="#ff8042" />
      </ChartSection>

      <ChartSection title="Created vs Closed (Stacked)">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="created_issues" stackId="a" fill="#0088FE" />
            <Bar dataKey="closed_issues" stackId="a" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </ChartSection>
    </div>
  );
}

const ChartSection = ({ title, children }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const BarChartComponent = ({ data, dataKey, fill = "#82ca9d" }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKey} fill={fill} />
    </BarChart>
  </ResponsiveContainer>
);

const LineChartComponent = ({ data, dataKey }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);