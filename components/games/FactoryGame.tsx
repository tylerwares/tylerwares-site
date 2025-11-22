import React, { useState, useEffect } from 'react';

export const FactoryGame: React.FC = () => {
  const [widgets, setWidgets] = useState(0);
  const [money, setMoney] = useState(0);
  const [robots, setRobots] = useState(0);
  const [speedLvl, setSpeedLvl] = useState(1);
  
  const robotCost = Math.floor(10 * Math.pow(1.5, robots));
  const speedCost = Math.floor(50 * Math.pow(2, speedLvl));
  const sellPrice = 1;

  // Production Loop
  useEffect(() => {
    if (robots === 0) return;
    // Production rate depends on speed level
    const tickRate = Math.max(100, 1000 - (speedLvl * 100)); 
    
    const interval = setInterval(() => {
      setWidgets(w => w + robots);
    }, tickRate);
    return () => clearInterval(interval);
  }, [robots, speedLvl]);

  const makeWidget = () => setWidgets(w => w + 1);
  
  const sellWidgets = () => {
    if (widgets > 0) {
      setMoney(m => m + (widgets * sellPrice));
      setWidgets(0);
    }
  };

  const buyRobot = () => {
    if (money >= robotCost) {
      setMoney(m => m - robotCost);
      setRobots(r => r + 1);
    }
  };

  const upgradeSpeed = () => {
    if (money >= speedCost) {
      setMoney(m => m - speedCost);
      setSpeedLvl(s => s + 1);
    }
  };

  return (
    <div className="p-4 bg-tyler-black border border-accent-orange font-mono h-full flex flex-col">
      
      {/* Visual Factory Floor */}
      <div className="h-40 mb-4 bg-gray-900 border border-gray-700 relative overflow-hidden">
        <div className="absolute top-2 left-2 text-[10px] text-gray-500">FLOOR_CAM_01</div>
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        {/* Robot Arms Row */}
        <div className="absolute top-1/3 left-0 w-full flex justify-around px-4">
            {Array.from({ length: Math.min(robots, 6) }).map((_, i) => (
                <div key={i} className="relative w-8 h-12 animate-[robot_1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }}>
                    {/* Arm Base */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-400"></div>
                    {/* Claw */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-accent-orange"></div>
                </div>
            ))}
            {robots === 0 && <div className="text-gray-600 mt-4 text-xs">NO WORKERS FOUND</div>}
        </div>

        {/* Conveyor Belt */}
        <div className="absolute bottom-4 left-[-20px] right-[-20px] h-8 bg-gray-800 border-y-2 border-gray-600 flex items-center overflow-hidden">
            {/* Moving Stripe Pattern */}
            <div className="absolute inset-0 flex" style={{ 
                backgroundImage: 'repeating-linear-gradient(45deg, #333 0, #333 10px, #222 10px, #222 20px)',
                animation: `conveyor ${1/speedLvl}s linear infinite`
            }}></div>
            
            {/* Widgets on Belt */}
            <div className="absolute inset-0 flex items-center justify-around animate-[conveyor_4s_linear_infinite]">
                {widgets > 0 && Array.from({ length: Math.min(widgets, 5) }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-white border border-black shadow-sm z-10"></div>
                ))}
            </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-black p-2 border-l-2 border-white">
            <div className="text-xs text-gray-500">WIDGETS</div>
            <div className="text-xl font-bold text-white">{widgets}</div>
        </div>
        <div className="bg-black p-2 border-l-2 border-accent-green">
            <div className="text-xs text-gray-500">FUNDS</div>
            <div className="text-xl font-bold text-accent-green">${money}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 gap-2 overflow-y-auto flex-1 pr-1">
        <button 
          onClick={makeWidget}
          className="w-full bg-white text-black hover:bg-gray-200 py-3 font-bold active:scale-95 transition-transform border-b-4 border-gray-400 active:border-b-0 active:mt-1"
        >
          MANUAL ASSEMBLE (CLICK)
        </button>
        
        <button 
          onClick={sellWidgets}
          disabled={widgets === 0}
          className="w-full py-2 border border-accent-green text-accent-green hover:bg-accent-green hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-accent-green transition-colors uppercase text-sm"
        >
          Ship Inventory (SELL)
        </button>

        <div className="grid grid-cols-2 gap-2">
            <button 
            onClick={buyRobot}
            disabled={money < robotCost}
            className="p-2 border border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-accent-blue transition-colors flex flex-col items-center justify-center"
            >
            <span className="text-xs">ADD ROBOT</span>
            <span className="font-bold">${robotCost}</span>
            </button>

            <button 
            onClick={upgradeSpeed}
            disabled={money < speedCost}
            className="p-2 border border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-accent-orange transition-colors flex flex-col items-center justify-center"
            >
            <span className="text-xs">FASTER BELT</span>
            <span className="font-bold">${speedCost}</span>
            </button>
        </div>
      </div>
    </div>
  );
};