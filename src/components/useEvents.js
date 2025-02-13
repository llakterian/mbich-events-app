import { useState, useCallback } from 'react';
import { formatEther } from 'ethers';

export const useEvents = (contract) => {
  const [events, setEvents] = useState([]);
  
  const loadEvents = useCallback(async () => {
    if (!contract) return;
    try {
      let id = 1;
      const eventsList = [];
      
      while (true) {
        try {
          const event = await contract.getEvent(id);
          eventsList.push({
            id,
            name: event[0],
            date: new Date(Number(event[1]) * 1000),
            price: formatEther(event[2]),
            available: Number(event[3])
          });
          id++;
        } catch (error) {
          break;
        }
      }
      setEvents(eventsList);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }, [contract]);

  return { events, loadEvents };
};
