import { useState, useEffect } from 'react';
import { formatEther } from 'ethers';

function TransactionHistory({ contract, account }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const filter = contract.filters.TicketPurchased(null, account);
      const events = await contract.queryFilter(filter);
      
      const formattedTxs = events.map(event => ({
        eventId: event.args.eventId.toString(),
        price: formatEther(event.args.price),
        timestamp: new Date(event.blockNumber * 1000).toLocaleString(),
        txHash: event.transactionHash
      }));
      
      setTransactions(formattedTxs);
    };

    if (contract && account) {
      fetchTransactions();
    }
  }, [contract, account]);

  return (
    <div className="transaction-history">
      <h3>Your Ticket Purchases</h3>
      {transactions.map((tx, index) => (
        <div key={index} className="transaction-card">
          <p>Event #{tx.eventId}</p>
          <p>Price: {tx.price} ETH</p>
          <p>Date: {tx.timestamp}</p>
          <a href={`https://localhost:8545/tx/${tx.txHash}`} target="_blank" rel="noopener noreferrer">
            View Transaction
          </a>
        </div>
      ))}
    </div>
  );
}

export default TransactionHistory;
