import React, { useContext } from 'react';
import { Web3Context } from '../../context/Web3Context';
import { notifySuccess, notifyError } from '../common/Toast';

export const EventCard = ({ event }) => {
  const { purchaseTicket } = useContext(Web3Context);

  const handlePurchase = async () => {
    try {
      await purchaseTicket(event.id, event.price);
      notifySuccess('Ticket purchased successfully!');
    } catch (error) {
      notifyError('Failed to purchase ticket');
    }
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{event.name}</div>
        <p className="text-gray-700 text-base">
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-base">
          Price: {event.price} ETH
        </p>
        <p className="text-gray-700 text-base">
          Available Tickets: {event.available}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button 
          onClick={handlePurchase}
          disabled={event.available === 0}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50"
        >
          {event.available > 0 ? 'Purchase Ticket' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
};
