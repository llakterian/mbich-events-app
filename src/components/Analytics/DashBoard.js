import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useTickets } from '../../hooks/useTickets';
import { useContext } from 'react';
import { Web3Context } from '../../context/Web3Context';

export const Dashboard = () => {
  const { contract } = useContext(Web3Context);
  const { marketMetrics, trendingEvents, priceHistory } = useAnalytics(contract);
  const { ticketMetrics } = useTickets(contract);

  return (
    <div className="analytics-dashboard grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="stats-card glass-effect p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Market Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="metric-card">
            <span className="text-2xl font-bold">{marketMetrics.totalVolume}</span>
            <span className="text-sm text-gray-400">Total Volume</span>
          </div>
          <div className="metric-card">
            <span className="text-2xl font-bold">{marketMetrics.activeEvents}</span>
            <span className="text-sm text-gray-400">Active Events</span>
          </div>
        </div>
      </div>

      <div className="stats-card glass-effect p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Price Trends</h3>
        <LineChart width={500} height={300} data={priceHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </div>

      <div className="stats-card glass-effect p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Trending Events</h3>
        <BarChart width={500} height={300} data={trendingEvents}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tickets" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="stats-card glass-effect p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Your Activity</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="metric-card">
            <span className="text-2xl font-bold">{ticketMetrics.totalOwned}</span>
            <span className="text-sm text-gray-400">Tickets Owned</span>
          </div>
          <div className="metric-card">
            <span className="text-2xl font-bold">{ticketMetrics.totalValue} ETH</span>
            <span className="text-sm text-gray-400">Portfolio Value</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
