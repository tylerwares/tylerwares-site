import React, { useState, useEffect, useRef } from 'react';

export const CryptoGame: React.FC = () => {
  const [price, setPrice] = useState(100);
  const [cash, setCash] = useState(1000);
  const [coins, setCoins] = useState(0);
  const [history, setHistory] = useState<number[]>(new Array(20).fill(100));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Chaotic price movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(currentPrice => {
        const volatility = Math.random() > 0.8 ? 20 : 5; // Occasional huge spikes/dips
        const change = (Math.random() - 0.5) * volatility;
        let newPrice = currentPrice + change;
        if (newPrice < 1) newPrice = 1; // Rug pull protection
        
        setHistory(h => [...h.slice(1), newPrice]);
        return newPrice;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Draw Chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;

    ctx.beginPath();
    ctx.strokeStyle = history[history.length - 1] >= history[0] ? '#00FF94' : '#FF0055';
    ctx.lineWidth = 2;

    history.forEach((p, i) => {
      const x = (i / (history.length - 1)) * canvas.width;
      const y = canvas.height - ((p - min) / range) * canvas.height * 0.8 - 10; // Padding
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

  }, [history]);

  const buy = () => {
    if (cash >= price) {
      setCash(c => c - price);
      setCoins(c => c + 1);
    }
  };

  const sell = () => {
    if (coins >= 1) {
      setCash(c => c + price);
      setCoins(c => c - 1);
    }
  };

  const totalValue = cash + (coins * price);

  return (
    <div className="p-6 bg-tyler-black border border-accent-blue font-mono text-center h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl text-accent-blue font-bold mb-4 border-b border-gray-700 pb-2">
          PAPER HANDS SIM
        </h3>
        
        <div className="bg-gray-900 h-24 mb-4 relative border border-gray-800 overflow-hidden">
            <canvas ref={canvasRef} width={300} height={96} className="w-full h-full" />
            <div className="absolute top-1 right-1 text-xs text-white bg-black px-1">
                ${price.toFixed(2)}
            </div>
        </div>

        <div className="flex justify-between text-sm mb-4">
            <div className="text-gray-400">CASH: <span className="text-white">${cash.toFixed(0)}</span></div>
            <div className="text-gray-400">COINS: <span className="text-white">{coins}</span></div>
        </div>
        
        <div className={`text-2xl font-bold mb-6 ${totalValue >= 1000 ? 'text-accent-green' : 'text-accent-pink'}`}>
            NET: ${totalValue.toFixed(0)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={buy}
          disabled={cash < price}
          className="bg-accent-green/10 border border-accent-green text-accent-green py-3 hover:bg-accent-green hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-accent-green"
        >
          BUY
        </button>
        <button 
          onClick={sell}
          disabled={coins < 1}
          className="bg-accent-pink/10 border border-accent-pink text-accent-pink py-3 hover:bg-accent-pink hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-accent-pink"
        >
          SELL
        </button>
      </div>
    </div>
  );
};