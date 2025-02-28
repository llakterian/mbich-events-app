import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { EventManagementABI } from '../config/abi';
import { CONTRACT_ADDRESS } from '../config/contract';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const eventContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          EventManagementABI,
          signer
        );
        setContract(eventContract);
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Web3 initialization error:', error);
      }
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ contract, account }}>
      {children}
    </Web3Context.Provider>
  );
};
