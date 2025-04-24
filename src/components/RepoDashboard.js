import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './RepoDashboard.css';

export default function RepoDashboard({ repo }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/analytics/${repo}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [repo]);

  if (!data) return <div className="loading">Loading charts...</div>;

  const chartBlock = (title, ChartComponent) => (
    <section className="chart-section">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {ChartComponent}
      </ResponsiveContainer>
    </section>
  );

  const dummy = [{ name: 'Jan', value: 40 }, { name: 'Feb', value: 30 }];

  return (
    <div className="dashboard">
      <h2>📈 Charts for {repo}</h2>

      {chartBlock('Issues Over Time (Line)', (
        <LineChart data={data.issues_over_time || dummy}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="issues" stroke="#8884d8" />
        </LineChart>
      ))}

      {chartBlock('Monthly Issues (Bar)', (
        <BarChart data={data.monthly_issues || dummy}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="issues" fill="#82ca9d" />
        </BarChart>
      ))}

      {chartBlock('Stars Count (Bar)', (
        <BarChart data={data.stars || dummy}>
          <XAxis dataKey="repo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stars" fill="#ffc658" />
        </BarChart>
      ))}

      {chartBlock('Forks Count (Bar)', (
        <BarChart data={data.forks || dummy}>
          <XAxis dataKey="repo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="forks" fill="#ff7300" />
        </BarChart>
      ))}

      {chartBlock('Weekly Issues Closed (Bar)', (
        <BarChart data={data.weekly_closed || dummy}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="closed" fill="#8884d8" />
        </BarChart>
      ))}

      {chartBlock('Created vs Closed Issues (Stacked Bar)', (
        <BarChart data={data.created_closed || dummy}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="repo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="created" stackId="a" fill="#82ca9d" />
          <Bar dataKey="closed" stackId="a" fill="#8884d8" />
        </BarChart>
      ))}

      {/* Forecasts (LSTM) */}
      {chartBlock('Max Issues Created - Day (LSTM)', <p>{data.lstm?.max_issues_day || 'N/A'}</p>)}
      {chartBlock('Max Issues Closed - Day (LSTM)', <p>{data.lstm?.max_closed_day || 'N/A'}</p>)}
      {chartBlock('Max Closed Issues - Month (LSTM)', <p>{data.lstm?.max_closed_month || 'N/A'}</p>)}
      {chartBlock('Created Issues Forecast (LSTM)', <BarChart data={data.lstm?.created_forecast || dummy}><XAxis dataKey="date" /><YAxis /><Bar dataKey="value" fill="#8884d8" /></BarChart>)}
      {chartBlock('Closed Issues Forecast (LSTM)', <BarChart data={data.lstm?.closed_forecast || dummy}><XAxis dataKey="date" /><YAxis /><Bar dataKey="value" fill="#82ca9d" /></BarChart>)}
      {chartBlock('Pulls Forecast (LSTM)', <BarChart data={data.lstm?.pulls_forecast || dummy}><XAxis dataKey="date" /><YAxis /><Bar dataKey="value" fill="#ffc658" /></BarChart>)}
      {chartBlock('Commits Forecast (LSTM)', <BarChart data={data.lstm?.commits_forecast || dummy}><XAxis dataKey="date" /><YAxis /><Bar dataKey="value" fill="#ff7300" /></BarChart>)}
      {chartBlock('Branches Forecast (LSTM)', <BarChart data={data.lstm?.branches_forecast || dummy}><XAxis dataKey="date" /><YAxis /><Bar dataKey="value" fill="#a4de6c" /></BarChart>)}
      {chartBlock('Contributors Forecast (LSTM)', <BarChart data={data.lstm?.contributors_forecast || dummy}><XAxis dataKey="date" /><YAxis /><Bar dataKey="value" fill="#d0ed57" /></BarChart>)}
      {chartBlock('Releases Forecast (LSTM)', <BarChart data={data.lstm?.releases_forecast || dummy}><XAxis dataKey="date" /><YAxis /><Bar dataKey="value" fill="#8884d8" /></BarChart>)}

      {/* You can replicate this exact block structure for Prophet and StatsModel forecast outputs next */}
    </div>
  );
}