import React, { useState } from 'react';
import { FactoryGame } from './games/FactoryGame';
import { CryptoGame } from './games/CryptoGame';

export const GameArcade: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'factory' | 'crypto'>('factory');

  return (
    <div className="max-w-4xl mx-auto w-full bg-black/50 border-2 border-gray-800 p-2 relative shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
      <div className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-1 font-mono font-bold uppercase tracking-widest rotate-1 z-10">
        STUPID_GAMES_ARCADE
      </div>

      <div className="flex border-b border-gray-700 mb-4 mt-4">
        <button
          onClick={() => setActiveTab('factory')}
          className={`flex-1 py-2 font-mono text-sm uppercase transition-colors ${
            activeTab === 'factory' 
              ? 'bg-accent-orange text-black font-bold' 
              : 'text-gray-500 hover:text-white hover:bg-gray-900'
          }`}
        >
          Factory Optimizer
        </button>
        <button
          onClick={() => setActiveTab('crypto')}
          className={`flex-1 py-2 font-mono text-sm uppercase transition-colors ${
            activeTab === 'crypto' 
              ? 'bg-accent-blue text-black font-bold' 
              : 'text-gray-500 hover:text-white hover:bg-gray-900'
          }`}
        >
          Paper Hands
        </button>
      </div>

      <div className="h-96">
        {activeTab === 'factory' ? <FactoryGame /> : <CryptoGame />}
      </div>
    </div>
  );
};