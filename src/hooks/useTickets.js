import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

const validateTicketBatch = async (tickets) => {
  return tickets.reduce((acc, ticket) => ({
    ...acc,
    [ticket.ticketId]: true
  }), {});
};

const calculateTicketMetrics = (tickets, transfers) => {
  return {
    totalOwned: tickets.length,
    totalValue: tickets.reduce((acc, ticket) => acc + Number(ticket.price), 0),
    recentTransfers: transfers.slice(-5)
  };
};

export const useTickets = (contract) => {
  const [ticketData, setTicketData] = useState({
    userTickets: [],
    ticketMetrics: {
      totalOwned: 0,
      totalValue: 0,
      recentTransfers: []
    },
    transferHistory: [],
    validationStatus: {}
  });

  const loadTicketData = useCallback(async () => {
    if (!contract) return;

    try {
      const tickets = await contract.getUserTickets();
      const transfers = await contract.queryFilter(contract.filters.TicketTransferred());
      const validations = await validateTicketBatch(tickets);
      const metrics = calculateTicketMetrics(tickets, transfers);
      
      setTicketData({
        userTickets: tickets,
        ticketMetrics: metrics,
        transferHistory: transfers,
        validationStatus: validations
      });
    } catch (error) {
      console.error('Error loading ticket data:', error);
    }
  }, [contract]);

  useEffect(() => {
    loadTicketData();
    contract?.on('TicketTransferred', loadTicketData);
    return () => contract?.off('TicketTransferred', loadTicketData);
  }, [contract, loadTicketData]);

  return { ...ticketData, refreshTickets: loadTicketData };
};
