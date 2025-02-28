import React, { useContext, useState } from 'react';
import { Web3Context } from '../../context/Web3Context';
import { notifySuccess, notifyError } from '../common/Toast';

export const TicketPurchase = ({ event }) => {
  const { purchaseTicket } = useContext(Web3Context);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      await purchaseTicket(event.id, event.price);
      notifySuccess('Ticket purchased successfully!');
    } catch (error) {
      notifyError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button 
      onClick={handlePurchase}
      disabled={isProcessing || event.available === 0}
      className="wallet-button"
    >
      {isProcessing ? 'Processing...' : `Buy Ticket (${event.price} ETH)`}
    </button>
  );
};
