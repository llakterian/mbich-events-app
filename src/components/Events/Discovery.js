import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../../context/Web3Context';
import { EventCard } from './EventCard';

export const Discovery = () => {
  const { contract } = useContext(Web3Context);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventCount = await contract.getEventCount();
        const fetchedEvents = await Promise.all(
          Array(eventCount).fill().map(async (_, i) => {
            const [name, date, price, available] = await contract.getEvent(i);
            return { id: i, name, date, price, available };
          })
        );
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, [contract]);

  return (
    <div className="discovery-section">
      <div className="event-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
