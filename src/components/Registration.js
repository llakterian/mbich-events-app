import { useState } from 'react';

function Registration({ contract }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerAsOrganizer = async () => {
    setIsLoading(true);
    try {
      console.log('Contract state:', contract);
      const tx = await contract.registerAsOrganizer();
      console.log('Transaction:', tx);
      const receipt = await tx.wait();
      console.log('Receipt:', receipt);
      setIsRegistered(true);
    } catch (error) {
      console.log('Registration attempt details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration">
      <button 
        onClick={registerAsOrganizer}
        disabled={isLoading}
        className="register-button"
      >
        {isLoading ? 'Processing...' : isRegistered ? 'Registered as Organizer' : 'Register as Organizer'}
      </button>
    </div>
  );
}

export default Registration;
