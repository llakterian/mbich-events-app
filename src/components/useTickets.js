import { useState, useCallback } from 'react';

export const useTickets = (contract) => {
  const [userTickets, setUserTickets] = useState([]);
  
  const loadUserTickets = useCallback(async () => {
    if (!contract) return;
    try {
      const tickets = await contract.getUserTickets();
      setUserTickets(Array.isArray(tickets) ? tickets : []);
    } catch (error) {
      console.error('Error loading tickets:', error);
      setUserTickets([]);
    }
  }, [contract]);

  return { userTickets, loadUserTickets };
};
