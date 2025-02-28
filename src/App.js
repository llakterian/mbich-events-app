import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Web3Provider } from './context/Web3Context';
import { Hero } from './components/Hero/Hero';
import { EventList } from './components/Events/EventList';
import { EventCalendar } from './components/Events/EventCalendar';
import { TicketManager } from './components/Ticket/TicketManager';
import { Analytics } from './components/Analytics/Analytics';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

const NAV_ITEMS = [
  { id: 'events', label: 'Events', component: EventList },
  { id: 'calendar', label: 'Calendar', component: EventCalendar },
  { id: 'tickets', label: 'Tickets', component: TicketManager },
  { id: 'analytics', label: 'Analytics', component: Analytics }
];

const Navigation = ({ activeView, onViewChange }) => (
  <nav className="bg-white shadow-md sticky top-0 z-50">
    <div className="nav-links">
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={`px-4 py-2 ${activeView === id ? 'text-blue-600' : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  </nav>
);

Navigation.propTypes = {
  activeView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired
};

function App() {
  const [activeView, setActiveView] = useState('events');
  const [isLoading, setIsLoading] = useState(false);

  const handleViewChange = (view) => {
    setIsLoading(true);
    setActiveView(view);
    // Simulate transition
    setTimeout(() => setIsLoading(false), 300);
  };

  const ActiveComponent = NAV_ITEMS.find(item => item.id === activeView)?.component;

  return (
    <ErrorBoundary>
      <Web3Provider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Navigation 
            activeView={activeView} 
            onViewChange={handleViewChange}
          />
          
          <Hero />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                ActiveComponent && <ActiveComponent />
              )}
            </Suspense>
          </main>
        </div>
      </Web3Provider>
    </ErrorBoundary>
  );
}

export default App;
