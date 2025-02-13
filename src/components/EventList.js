import { useEffect, useState } from 'react';
import { parseEther } from 'ethers';
import { useEvents } from '../hooks/useEvents';
import { useTickets } from '../hooks/useTickets';
import { EventCard } from './Event/EventCard';
import { TicketCard } from './Ticket/TicketCard';

function EventList({ contract }) {
  const { events, loadEvents } = useEvents(contract);
  const { userTickets, loadUserTickets } = useTickets(contract);
  const [registrationStatus, setRegistrationStatus] = useState({});

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
      await Promise.all([loadEvents(), loadUserTickets()]);
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationStatus(prev => ({ ...prev, [eventId]: 'failed' }));
    }
  };

  return (
    <div className="event-dashboard">
      <section className="events-section">
        <h2>Available Events</h2>
        <div className="events-grid">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={registerForEvent}
              registrationStatus={registrationStatus[event.id]}
            />
          ))}
        </div>
      </section>

      <section className="tickets-section">
        <h2>My Tickets</h2>
        <div className="tickets-grid">
          {userTickets.map((ticket, index) => (
            <TicketCard key={index} ticket={ticket} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default EventList;
