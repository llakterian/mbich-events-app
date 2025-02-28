import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TicketCard } from '../Ticket/TicketCard';
import { EventPriceTracker } from '../Events/PriceTracker';
import { useWeb3Context } from '../../context/Web3Context';
import ErrorBoundary from '../ErrorBoundary';

const PREVIEW_TICKET_ID = 1;
const PREVIEW_EVENT_ID = 1;

export const Hero = () => {
  const { contract, isLoading } = useWeb3Context();

  const previewTicket = useMemo(() => ({
    ticketId: PREVIEW_TICKET_ID,
    eventId: PREVIEW_EVENT_ID
  }), []);

  if (isLoading) {
    return <div className="hero-container min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      <div>Loading...</div>
    </div>;
  }

  return (
    <div className="hero-container min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="featured-events-grid p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to MBICH Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ErrorBoundary>
            <EventPriceTracker contract={contract} />
            <TicketCard ticket={previewTicket} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  contract: PropTypes.object
};

export default Hero;
