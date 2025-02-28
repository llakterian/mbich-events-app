import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { toggleTheme } from '../../utils/themeToggle';

export const Analytics = ({ marketMetrics, trendingEvents, priceHistory, userActivity }) => {
  const stats = {
    totalEvents: marketMetrics?.totalEvents || 0,
    totalValue: marketMetrics?.totalValue || 0,
    activeUsers: userActivity?.length || 0
  };
  const toggleTheme = () => {
    const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', theme);
  };



  return (
    <motion.div 
      className="analytics-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stat-card">
        <h3>Total Events</h3>
        <CountUp end={stats.totalEvents} duration={2.5} />
      </div>
      <div className="stat-card">
        <h3>Market Value</h3>
        <CountUp end={stats.totalValue} decimals={2} duration={2.5} suffix=" ETH" />
      </div>
      <div className="stat-card">
        <h3>Active Users</h3>
        <CountUp end={stats.activeUsers} duration={2.5} />
      </div>
    </motion.div>
  );
};
