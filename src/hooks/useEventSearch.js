import { useState, useMemo } from 'react';

export const useEventSearch = (events) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEvents = useMemo(() => {
    return events.filter(event => 
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  return { searchTerm, setSearchTerm, filteredEvents };
};
