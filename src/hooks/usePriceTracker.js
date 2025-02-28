import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const usePriceTracker = (eventId) => {
  const [priceData, setPriceData] = useState({
    currentPrice: 0,
    priceHistory: [],
    volatility: 0,
    trend: 'stable'
  });

  useEffect(() => {
    const updatePrice = async () => {
      // Real-time price updates using WebSocket
      const ws = new WebSocket('wss://your-price-feed');
      ws.onmessage = (event) => {
        const newPrice = JSON.parse(event.data);
        setPriceData(prev => ({
          currentPrice: newPrice.value,
          priceHistory: [...prev.priceHistory, newPrice],
          volatility: calculateVolatility(newPrice, prev.priceHistory),
          trend: determineTrend(newPrice, prev.currentPrice)
        }));
      };
    };

    updatePrice();
  }, [eventId]);

  const calculateVolatility = (newPrice, history) => {
    // Add volatility calculation logic
    return history.length > 0 ? Math.abs(newPrice.value - history[history.length - 1].value) : 0;
  };
  
  const determineTrend = (newPrice, oldPrice) => {
    return newPrice > oldPrice ? 'up' : newPrice < oldPrice ? 'down' : 'stable';
  };
  

  return priceData;
};
