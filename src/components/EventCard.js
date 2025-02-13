import { parseEther } from 'ethers';

export const EventCard = ({ event, onRegister, registrationStatus }) => (
  <div className="event-card">
    <div className="event-info">
      <h3>{event.name}</h3>
      <p className="date">{event.date.toLocaleDateString()}</p>
      <p className="price">{event.price} ETH</p>
      <p className="availability">{event.available} tickets remaining</p>
    </div>
    <button 
      className={`register-button ${registrationStatus}`}
      onClick={() => onRegister(event.id, event.price)}
      disabled={registrationStatus === 'processing'}
    >
      {registrationStatus === 'processing' ? 'Registering...' : 'Register Now'}
    </button>
  </div>
);
