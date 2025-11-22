import React, { useState, useEffect, useRef } from 'react';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  color: string;
  price: number;
  history: number[];
  holdings: number;
  volatility: number;
}

export const CryptoGame: React.FC = () => {
  const [cash, setCash] = useState(1000);
  const [selectedCoinId, setSelectedCoinId] = useState('BTC');
  const [coins, setCoins] = useState<Coin[]>([
    {
      id: 'BTC',
      name: 'Botcoin',
      symbol: 'BTC',
      color: '#FF6B00',
      price: 45000,
      history: new Array(30).fill(45000),
      holdings: 0,
      volatility: 100,
    },
    {
      id: 'UTH',
      name: 'Uthereum',
      symbol: 'UTH',
      color: '#00C2FF',
      price: 3000,
      history: new Array(30).fill(3000),
      holdings: 0,
      volatility: 50,
    },
    {
      id: 'SOL',
      name: 'Solami',
      symbol: 'SOL',
      color: '#00FF94',
      price: 150,
      history: new Array(30).fill(150),
      holdings: 0,
      volatility: 15,
    }
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedCoin = coins.find(c => c.id === selectedCoinId)!;

  // Market movement simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => prevCoins.map(coin => {
        // Chaotic random movement
        const direction = Math.random() > 0.5 ? 1 : -1;
        const intensity = Math.random();
        // Occasional massive crash or pump
        const chaosMultiplier = Math.random() > 0.95 ? 5 : 1;
        
        const change = direction * intensity * coin.volatility * chaosMultiplier;
        let newPrice = coin.price + change;
        
        // Prevent going to 0 (unless rugged, but let's be nice)
        if (newPrice < 1) newPrice = 1;

        const newHistory = [...coin.history.slice(1), newPrice];
        return { ...coin, price: newPrice, history: newHistory };
      }));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Draw Chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const history = selectedCoin.history;
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = selectedCoin.color;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';

    history.forEach((p, i) => {
      const x = (i / (history.length - 1)) * canvas.width;
      // Scale y to fit canvas with padding
      const y = canvas.height - ((p - min) / range) * (canvas.height - 20) - 10;
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = selectedCoin.color;
    ctx.stroke();
    ctx.shadowBlur = 0;

  }, [coins, selectedCoinId]);

  const buy = () => {
    if (cash >= selectedCoin.price) {
      setCash(c => c - selectedCoin.price);
      setCoins(prev => prev.map(c => 
        c.id === selectedCoinId ? { ...c, holdings: c.holdings + 1 } : c
      ));
    }
  };

  const sell = () => {
    if (selectedCoin.holdings >= 1) {
      setCash(c => c + selectedCoin.price);
      setCoins(prev => prev.map(c => 
        c.id === selectedCoinId ? { ...c, holdings: c.holdings - 1 } : c
      ));
    }
  };

  const totalPortfolioValue = coins.reduce((acc, c) => acc + (c.price * c.holdings), 0);
  const netWorth = cash + totalPortfolioValue;

  return (
    <div className="p-6 bg-tyler-black border border-accent-blue font-mono h-full flex flex-col gap-4">
      
      {/* Header Stats */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <div>
            <div className="text-xs text-gray-500">NET WORTH</div>
            <div className={`text-2xl font-bold ${netWorth >= 1000 ? 'text-accent-green' : 'text-accent-pink'}`}>
                ${netWorth.toFixed(0)}
            </div>
        </div>
        <div className="text-right">
            <div className="text-xs text-gray-500">LIQUID CASH</div>
            <div className="text-xl text-white">${cash.toFixed(0)}</div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex flex-1 gap-4 min-h-0">
        
        {/* Coin List */}
        <div className="w-1/3 flex flex-col gap-2 overflow-y-auto pr-1">
            {coins.map(coin => (
                <div 
                    key={coin.id}
                    onClick={() => setSelectedCoinId(coin.id)}
                    className={`
                        p-2 border-2 cursor-pointer transition-all relative overflow-hidden group
                        ${selectedCoinId === coin.id ? 'border-white bg-gray-900' : 'border-gray-800 hover:border-gray-600'}
                    `}
                >
                    <div className="flex items-center justify-between mb-1 relative z-10">
                        <div className="flex items-center gap-2">
                            {/* Joke Logo */}
                            <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] text-black"
                                style={{ backgroundColor: coin.color }}
                            >
                                {coin.symbol[0]}
                            </div>
                            <span className="font-bold text-sm">{coin.symbol}</span>
                        </div>
                    </div>
                    <div className="text-xs text-right relative z-10" style={{ color: coin.color }}>
                        ${coin.price.toFixed(0)}
                    </div>
                    <div className="text-[10px] text-gray-500 text-right relative z-10">
                        Owned: {coin.holdings}
                    </div>
                    
                    {/* Selection Indicator */}
                    {selectedCoinId === coin.id && (
                        <div className="absolute right-0 top-0 bottom-0 w-1" style={{ backgroundColor: coin.color }}></div>
                    )}
                </div>
            ))}
        </div>

        {/* Chart & Controls */}
        <div className="w-2/3 flex flex-col">
            <div className="flex-1 bg-black border border-gray-800 relative mb-4 p-2">
                <canvas ref={canvasRef} width={400} height={200} className="w-full h-full object-contain" />
                <div className="absolute top-2 left-2 text-xs font-bold" style={{ color: selectedCoin.color }}>
                    {selectedCoin.name} // LIVE
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 h-14">
                <button 
                    onClick={buy}
                    disabled={cash < selectedCoin.price}
                    className="bg-accent-green/20 border border-accent-green text-accent-green hover:bg-accent-green hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-accent-green font-bold"
                >
                    BUY
                </button>
                <button 
                    onClick={sell}
                    disabled={selectedCoin.holdings < 1}
                    className="bg-accent-pink/20 border border-accent-pink text-accent-pink hover:bg-accent-pink hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-accent-pink font-bold"
                >
                    SELL
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};