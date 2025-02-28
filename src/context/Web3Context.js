import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { EventManagementABI } from '../config/abi';
import { CONTRACT_ADDRESS } from '../config/contract';
import { 
  BrowserProvider,
  Contract,
  formatEther,
  parseEther 
} from 'ethers';

const Web3Context = createContext();

const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3Context must be used within a Web3Provider');
  }
  return context;
};

const Web3Provider = ({ children }) => {
  const [contractState, setContractState] = useState({
    events: [],
    userTickets: [],
    isOrganizer: false,
    totalEventCount: 0
  });

  const [web3State, setWeb3State] = useState({
    account: null,
    contract: null,
    provider: null,
    networkId: null
  });

  const refreshEventData = useCallback(async () => {
    if (!web3State.contract) return;
    try {
      const events = [];
      const totalEvents = await web3State.contract.totalEvents();
      
      for (let i = 0; i < totalEvents; i++) {
        const event = await web3State.contract.events(i);
        events.push({
          id: i,
          name: event.name,
          date: new Date(Number(event.date) * 1000),
          price: formatEther(event.price),
          available: Number(event.ticketsAvailable)
        });
      }
      
      setContractState(prev => ({ ...prev, events, totalEventCount: totalEvents }));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [web3State.contract]);

  const refreshUserTickets = useCallback(async () => {
    if (!web3State.contract) return;
    try {
      const tickets = await web3State.contract.getUserTickets();
      const formattedTickets = tickets.map(ticket => ({
        ticketId: Number(ticket.ticketId),
        eventId: Number(ticket.eventId),
        uniqueHash: ticket.uniqueHash,
        isValid: ticket.isValid
      }));
      setContractState(prev => ({ ...prev, userTickets: formattedTickets }));
    } catch (error) {
      console.error('Error fetching user tickets:', error);
    }
  }, [web3State.contract]);

  const contractActions = {
    createEvent: async (name, date, price, ticketCount) => {
      try {
        const priceInWei = parseEther(price.toString());
        const tx = await web3State.contract.createEvent(
          name,
          Math.floor(date.getTime() / 1000),
          priceInWei,
          ticketCount
        );
        await tx.wait();
        await refreshEventData();
        return true;
      } catch (error) {
        throw new Error(`Event creation failed: ${error.message}`);
      }
    },

    purchaseTicket: async (eventId, price) => {
      try {
        const tx = await web3State.contract.purchaseTicket(eventId, {
          value: parseEther(price.toString())
        });
        const receipt = await tx.wait();
        const purchaseEvent = receipt.events.find(e => e.event === 'TicketPurchased');
        await refreshUserTickets();
        return purchaseEvent.args.ticketId;
      } catch (error) {
        throw new Error(`Ticket purchase failed: ${error.message}`);
      }
    }
  };

  const initializeContract = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, EventManagementABI, signer);
      setWeb3State(prev => ({
        ...prev,
        provider,
        contract,
        account: signer.address
      }));
    } catch (error) {
      console.error('Contract initialization failed:', error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      initializeContract();
    }
  }, []);

  useEffect(() => {
    if (web3State.contract) {
      const handleTicketPurchase = (eventId, buyer, price) => {
        if (buyer === web3State.account) {
          refreshUserTickets();
        }
        refreshEventData();
      };

      web3State.contract.on('TicketPurchased', handleTicketPurchase);

      return () => {
        web3State.contract.removeAllListeners();
      };
    }
  }, [web3State.contract, web3State.account, refreshEventData, refreshUserTickets]);

  const value = {
    ...web3State,
    ...contractState,
    ...contractActions,
    refreshEventData,
    refreshUserTickets,
    initializeContract
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

// Single export statement for all components
export { Web3Context, Web3Provider, useWeb3Context };
