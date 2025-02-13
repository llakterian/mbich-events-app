import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import TicketDisplay from './components/TicketDisplay';
import { CONTRACT_ADDRESS } from './config/contract';
import { EventManagementABI } from './config/abi';
import './styles/App.css';

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          EventManagementABI,
          signer
        );
        setContract(contract);
        setAccount(await signer.getAddress());
      }
    };
    initContract();
  }, []);

  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">Mbichwa Events</div>
        <div className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create Event
          </button>
          <button 
            className={`nav-btn ${activeTab === 'tickets' ? 'active' : ''}`}
            onClick={() => setActiveTab('tickets')}
          >
            My Tickets
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'events' && <EventList contract={contract} />}
        {activeTab === 'create' && <EventForm contract={contract} />}
        {activeTab === 'tickets' && <TicketDisplay contract={contract} userAddress={account} />}
      </main>
    </div>
  );
}

export default App;
