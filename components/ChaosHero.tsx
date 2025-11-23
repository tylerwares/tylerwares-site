import React, { useState, useEffect } from 'react';

export const ChaosHero: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden p-4">
      {/* Background Gradients (No Purple) */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-accent-green opacity-10 blur-[100px] animate-float" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-accent-blue opacity-10 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />

      <div className="z-10 text-center relative max-w-4xl mx-auto">
        <p className="font-mono text-accent-orange mb-4 tracking-[0.2em] uppercase text-sm md:text-base animate-pulse">
          Current Status: Automating The World
        </p>
        
        <h1 
          className="text-6xl md:text-9xl font-black tracking-tighter mb-6 leading-[0.9] text-white mix-blend-difference"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          TYLER<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-accent-blue">
            WARES
          </span>
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl md:text-2xl font-mono mt-6">
          <span className="bg-white text-black px-4 py-1 -rotate-2 hover:rotate-0 transition-transform cursor-default">
            Builder
          </span>
          <span className="text-gray-500 hidden md:inline"> // </span>
          <span className="bg-accent-orange text-black px-4 py-1 rotate-1 hover:rotate-0 transition-transform cursor-default">
            Optimizer
          </span>
          <span className="text-gray-500 hidden md:inline"> // </span>
          <span className="bg-accent-blue text-black px-4 py-1 -rotate-1 hover:rotate-0 transition-transform cursor-default">
            Renaissance Man
          </span>
        </div>
      </div>
      
      {/* Marquee embedded in Hero for single-screen look */}
      <div className="absolute bottom-12 left-0 w-full bg-accent-green text-black py-2 overflow-hidden border-y-2 border-black -rotate-1 scale-105 z-20 shadow-[0px_0px_20px_rgba(0,255,148,0.5)]">
          <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] font-mono font-bold text-lg">
             BUILDING IN PUBLIC // AI ENTHUSIAST // FACTORY AUTOMATION // CRYPTO NATIVE // FESTIVAL GOER // OPTIMIZING EVERYTHING // 
             BUILDING IN PUBLIC // AI ENTHUSIAST // FACTORY AUTOMATION // CRYPTO NATIVE // FESTIVAL GOER // OPTIMIZING EVERYTHING // 
          </div>
      </div>
    </section>
  );
};