import React from 'react';
import { INTERESTS } from '../constants';

export const InterestsSection: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto py-10">
      {INTERESTS.map((interest, idx) => {
        // Pseudo-random rotation for chaotic feel
        const rotation = idx % 2 === 0 ? 'rotate-1' : '-rotate-1';
        const colorClass = 
          interest.category === 'Tech' ? 'bg-tyler-gray border-accent-blue text-accent-blue' :
          interest.category === 'Music' ? 'bg-tyler-gray border-accent-pink text-accent-pink' :
          interest.category === 'Mind' ? 'bg-tyler-gray border-accent-green text-accent-green' :
          'bg-tyler-gray border-accent-orange text-accent-orange'; // Lifestyle

        return (
          <div
            key={interest.name}
            className={`
              px-4 py-2 border-2 ${colorClass} font-mono font-bold uppercase text-sm
              hover:scale-110 hover:z-10 hover:bg-black transition-all duration-200 cursor-default
              ${rotation} hover:rotate-0
            `}
          >
            {interest.name}
          </div>
        );
      })}
    </div>
  );
};