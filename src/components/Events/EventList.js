import React, { useContext, useEffect } from 'react';
import { Web3Context } from '../../context/Web3Context';

export const EventList = () => {
  const { events, purchaseTicket, refreshEventData } = useContext(Web3Context);

  useEffect(() => {
    refreshEventData();
  }, [refreshEventData]);
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map(event => (
        <div key={event.id} className="event-card">
          <h3>{event.name}</h3>
          <p>Date: {event.date.toLocaleDateString()}</p>
          <p>Price: {event.price} ETH</p>
          <p>Available: {event.available}</p>
          <button 
            onClick={() => purchaseTicket(event.id, event.price)}
            disabled={event.available === 0}
            className="purchase-button"
          >
            Purchase Ticket
          </button>
        </div>
      ))}
    </div>
  );
};
