import { useState } from 'react';
import { parseEther } from 'ethers';

function EventForm({ contract }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    price: '',
    tickets: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timestamp = Math.floor(new Date(formData.date).getTime() / 1000);
      const tx = await contract.createEvent(
        formData.name,
        timestamp,
        parseEther(formData.price),
        formData.tickets
      );
      await tx.wait();
      setFormData({ name: '', date: '', price: '', tickets: '' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="event-form">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
        <input
          type="number"
          placeholder="Price (ETH)"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
        />
        <input
          type="number"
          placeholder="Number of Tickets"
          value={formData.tickets}
          onChange={(e) => setFormData({...formData, tickets: e.target.value})}
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;
