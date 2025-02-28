import { motion } from 'framer-motion';
import { useHolographic } from '../../hooks/useHolographic';
import { usePriceTracker } from '../../hooks/usePriceTracker';
import { QRCodeSVG } from 'qrcode.react';

export const TicketCard = ({ ticket }) => {
  const { holographicRef, effect } = useHolographic();
  const { currentPrice, trend } = usePriceTracker(ticket.eventId);

  const cardVariants = {
    hover: {
      scale: 1.02,
      rotateX: effect.rotation.x,
      rotateY: effect.rotation.y,
      z: effect.depth,
    }
  };

  return (
    <motion.div
      ref={holographicRef}
      className="ticket-card-premium"
      variants={cardVariants}
      whileHover="hover"
      style={{
        '--ticket-angle': `${effect.rotation.y}deg`,
        background: effect.lighting.color
      }}
    >
      <QRCodeSVG 
        value={`ticket-${ticket.ticketId}`}
        size={150}
        level="H"
        renderAs="canvas"
        imageSettings={{
          src: "/hologram-overlay.png",
          excavate: true,
          width: 40,
          height: 40
        }}
      />
      
      <motion.div 
        className="price-indicator"
        animate={{
          scale: trend === 'up' ? [1, 1.1, 1] : 1,
          color: trend === 'up' ? '#00ff88' : '#ff4466'
        }}
      >
        {currentPrice} ETH
      </motion.div>
    </motion.div>
  );
};
