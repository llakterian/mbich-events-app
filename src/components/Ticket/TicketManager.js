import { useContext, useState, useEffect, useCallback } from 'react';
import { Web3Context } from '../../context/Web3Context';
import { TransferTicket } from './TransferTicket';
import { QRCodeSVG } from 'qrcode.react';

export const TicketManager = () => {
  const { contract } = useContext(Web3Context);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchUserTickets = useCallback(async () => {
    try {
      const userTickets = await contract.getUserTickets();
      setTickets(userTickets);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  }, [contract]);

  useEffect(() => {
    fetchUserTickets();
  }, [fetchUserTickets]);
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <div key={ticket.ticketId} className="border rounded-lg p-4 shadow-md">
            <QRCodeSVG value={`ticket-${ticket.ticketId}`} size={128} />
            <div className="mt-4">
              <h3>Event ID: {ticket.eventId}</h3>
              <p>Ticket #{ticket.ticketId}</p>
              <button
                onClick={() => setSelectedTicket(ticket)}
                className="mt-2 bg-primary text-white px-4 py-2 rounded"
              >
                Transfer
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedTicket && (
        <TransferTicket
          contract={contract}
          ticketId={selectedTicket.ticketId}
          onSuccess={() => {
            setSelectedTicket(null);
            fetchUserTickets();
          }}
        />
      )}
    </div>
  );
};
