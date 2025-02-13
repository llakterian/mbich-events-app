import { useState, useEffect, useCallback } from 'react';
import { formatEther, parseEther } from 'ethers';
import { QRCodeSVG } from 'qrcode.react';

function EventList({ contract }) {
  const [events, setEvents] = useState([]);
  const [userTickets, setUserTickets] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState({});

  const loadEvents = useCallback(async () => {
    if (!contract) return;
    try {
      // Start from index 1 and try fetching events until we get an invalid one
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
          break; // Break the loop when we can't fetch more events
        }
      }
      setEvents(eventsList);
    } catch (error) {
      console.log('Error loading events:', error);
    }
  }, [contract]);

  const loadUserTickets = useCallback(async () => {
    if (!contract) return;
    try {
      const tickets = await contract.getUserTickets();
      setUserTickets(Array.isArray(tickets) ? tickets : []);
    } catch (error) {
      console.log('Error loading tickets:', error);
      setUserTickets([]);
    }
  }, [contract]);

  useEffect(() => {
    loadEvents();
    loadUserTickets();
  }, [loadEvents, loadUserTickets]);

  const registerForEvent = async (eventId, price) => {
    setRegistrationStatus(prev => ({ ...prev, [eventId]: 'processing' }));
    try {
      const tx = await contract.purchaseTicket(eventId, {
        value: parseEther(price)
      });
      await tx.wait();
      setRegistrationStatus(prev => ({ ...prev, [eventId]: 'success' }));
      await loadEvents();
      await loadUserTickets();
    } catch (error) {
      console.log('Registration error:', error);
      setRegistrationStatus(prev => ({ ...prev, [eventId]: 'failed' }));
    }
  };

  return (
    <div className="event-dashboard">
      <section className="events-section">
        <h2>Available Events</h2>
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-info">
                <h3>{event.name}</h3>
                <p className="date">{event.date.toLocaleDateString()}</p>
                <p className="price">{event.price} ETH</p>
                <p className="availability">
                  {event.available} tickets remaining
                </p>
              </div>
              <button 
                className={`register-button ${registrationStatus[event.id]}`}
                onClick={() => registerForEvent(event.id, event.price)}
                disabled={registrationStatus[event.id] === 'processing'}
              >
                {registrationStatus[event.id] === 'processing' ? 'Registering...' : 'Register Now'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="tickets-section">
        <h2>My Tickets</h2>
        <div className="tickets-grid">
          {userTickets.map((ticket, index) => (
            <div key={index} className="ticket-card">
              <div className="ticket-header">
                <h3>Event #{ticket.eventId}</h3>
                <span className="verification-badge">Verified</span>
              </div>
              <div className="qr-container">
                <QRCodeSVG value={ticket.uniqueHash || `ticket-${ticket.ticketId}`} size={150} />
              </div>
              <div className="ticket-footer">
                <span>Ticket #{ticket.ticketId}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default EventList;
