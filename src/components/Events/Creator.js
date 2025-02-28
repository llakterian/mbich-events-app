import { useContext, useState } from 'react';
import { Web3Context } from '../../context/Web3Context';
import { notifySuccess, notifyError } from '../common/Toast';
import { useGasTracker } from '../../hooks/useGasTracker';

export const Creator = () => {
  const { contract } = useContext(Web3Context);
  const { gasPrice } = useGasTracker();
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    price: '',
    ticketCount: ''
  });

  const handleCreateEvent = async () => {
    try {
      const tx = await contract.createEvent(
        eventDetails.name,
        new Date(eventDetails.date).getTime(),
        ethers.utils.parseEther(eventDetails.price),
        eventDetails.ticketCount
      );
      await tx.wait();
      notifySuccess('Event created successfully!');
    } catch (error) {
      notifyError('Failed to create event');
    }
  };

  return (
    <div className="creator-suite glass-card">
      <form onSubmit={handleCreateEvent}>
        <input
          type="text"
          placeholder="Event Name"
          onChange={e => setEventDetails({...eventDetails, name: e.target.value})}
        />
        <input
          type="datetime-local"
          onChange={e => setEventDetails({...eventDetails, date: e.target.value})}
        />
        <input
          type="number"
          placeholder="Price in ETH"
          onChange={e => setEventDetails({...eventDetails, price: e.target.value})}
        />
        <input
          type="number"
          placeholder="Number of Tickets"
          onChange={e => setEventDetails({...eventDetails, ticketCount: e.target.value})}
        />
        <button type="submit">Create Event</button>
      </form>
      <div className="gas-tracker">
        Current Gas Price: {gasPrice} gwei
      </div>
    </div>
  );
};
