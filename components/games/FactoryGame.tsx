import React, { useState, useEffect } from 'react';

export const FactoryGame: React.FC = () => {
  const [widgets, setWidgets] = useState(0);
  const [money, setMoney] = useState(0);
  const [robots, setRobots] = useState(0);
  
  const robotCost = Math.floor(10 * Math.pow(1.5, robots));
  const sellPrice = 1;

  useEffect(() => {
    if (robots === 0) return;
    const interval = setInterval(() => {
      setWidgets(w => w + robots);
    }, 1000);
    return () => clearInterval(interval);
  }, [robots]);

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

  return (
    <div className="p-6 bg-tyler-black border border-accent-orange font-mono text-center h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl text-accent-orange font-bold mb-4 border-b border-gray-700 pb-2">
          FACTORY OPTIMIZER v1.0
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900 p-2">
            <div className="text-xs text-gray-500">INVENTORY</div>
            <div className="text-2xl text-white font-bold">{widgets}</div>
          </div>
          <div className="bg-gray-900 p-2">
            <div className="text-xs text-gray-500">CAPITAL</div>
            <div className="text-2xl text-accent-green font-bold">${money}</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={makeWidget}
          className="w-full bg-tyler-gray hover:bg-white hover:text-black border border-white py-3 transition-colors active:scale-95"
        >
          MANUAL LABOR (CLICK)
        </button>
        
        <button 
          onClick={sellWidgets}
          disabled={widgets === 0}
          className={`w-full py-3 border ${widgets > 0 ? 'border-accent-green text-accent-green hover:bg-accent-green hover:text-black' : 'border-gray-700 text-gray-700 cursor-not-allowed'} transition-colors`}
        >
          SELL INVENTORY
        </button>

        <button 
          onClick={buyRobot}
          disabled={money < robotCost}
          className={`w-full py-3 border flex justify-between px-4 ${money >= robotCost ? 'border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-black' : 'border-gray-700 text-gray-700 cursor-not-allowed'} transition-colors`}
        >
          <span>AUTOMATE</span>
          <span>${robotCost}</span>
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        ACTIVE ROBOTS: {robots} <span className="animate-pulse inline-block ml-2">{robots > 0 ? '⚙️ WORKING' : '💤 IDLE'}</span>
      </div>
    </div>
  );
};