import React, { useState, useContext } from 'react';
import { Web3Context } from '../../context/Web3Context';
import { notifySuccess, notifyError } from '../common/Toast';
import { parseEther } from 'ethers';


export const EventForm = () => {
  const { contract } = useContext(Web3Context);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    price: '',
    ticketCount: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timestamp = new Date(formData.date).getTime() / 1000;
      const priceInWei = parseEther(formData.price);
      
      const tx = await contract.createEvent(
        formData.name,
        timestamp,
        priceInWei,
        formData.ticketCount
      );
      await tx.wait();
      notifySuccess("Event created successfully!");
    } catch (error) {
      notifyError("Failed to create event");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Event Name"
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input
        type="datetime-local"
        onChange={(e) => setFormData({...formData, date: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Price in ETH"
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Number of Tickets"
        onChange={(e) => setFormData({...formData, ticketCount: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <button 
        type="submit"
        className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark"
      >
        Create Event
      </button>
    </form>
  );
};
