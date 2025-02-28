import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toggleTheme } from '../utils/themeToggle';


function TicketDisplay({ contract, userAddress }) {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!contract || !userAddress) {
        setLoading(false);
        return;
      }

      try {
        const tickets = await contract.getUserTickets();
        if (tickets && tickets.length > 0) {
          const events = await Promise.all(
            tickets.map(async (ticket) => {
              const eventDetails = await contract.getEvent(ticket.eventId);
              return {
                id: ticket.eventId,
                name: eventDetails[0],
                date: new Date(Number(eventDetails[1]) * 1000),
                ticketId: ticket.ticketId,
                qrCode: ticket.uniqueHash
              };
            })
          );
          setRegisteredEvents(events);
        }
      } catch (error) {
        console.log('No tickets found for user');
      }
      setLoading(false);
    };

    fetchUserEvents();
  }, [contract, userAddress]);

  return (
    <div className="registered-events">
      <h2>My Tickets</h2>
      {loading ? (
        <p>Loading your tickets...</p>
      ) : registeredEvents.length > 0 ? (
        <div className="events-grid">
          {registeredEvents.map(event => (
            <div key={event.id} className="event-ticket">
              <h3>{event.name}</h3>
              <div className="qr-section">
                <QRCodeSVG value={event.qrCode} size={150} />
              </div>
              <p>Ticket #{event.ticketId}</p>
              <p>Event Date: {event.date.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't purchased any tickets yet.</p>
      )}
    </div>
  );
}

export default TicketDisplay;
