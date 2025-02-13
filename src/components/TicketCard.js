import { QRCodeSVG } from 'qrcode.react';

export const TicketCard = ({ ticket }) => (
  <div className="ticket-card">
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
);
