export const TransferTicket = ({ contract, ticketId, onSuccess }) => {
    const handleTransfer = async (recipientAddress) => {
      try {
        const tx = await contract.transferTicket(ticketId, recipientAddress);
        await tx.wait();
        onSuccess();
      } catch (error) {
        console.error('Transfer failed:', error);
      }
    };
    
    return (
      <div className="transfer-ticket">
        <input type="text" placeholder="Recipient Address" />
        <button onClick={handleTransfer}>Transfer Ticket</button>
      </div>
    );
  };
  