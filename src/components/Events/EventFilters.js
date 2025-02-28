import { useState } from 'react';
import { toggleTheme } from '../utils/themeToggle';


/*export const EventFilters = ({ onFilter }) => {
  return (
    <div className="filters-container">
      <input type="search" placeholder="Search events..." />
      <select>
        <option value="all">All Events</option>
        <option value="upcoming">Upcoming</option>
        <option value="today">Today</option>
      </select>
      <div className="price-range">
        <input type="range" min="0" max="1" step="0.1" />
        <span>Max Price: ETH</span>
      </div>
    </div>
  );
}; */
export const EventFilters = ({ categories, onFilterChange }) => (
    <div className="event-filters">
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">All Events</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
  