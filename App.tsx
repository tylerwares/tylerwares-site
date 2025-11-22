import React from 'react';
import { ChaosHero } from './components/ChaosHero';
import { ProjectCard } from './components/ProjectCard';
import { InterestsSection } from './components/InterestsSection';
import { ChatWidget } from './components/ChatWidget';
import { GameArcade } from './components/GameArcade';
import { PROJECTS, SOCIALS } from './constants';

const App: React.FC = () => {
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-tyler-black text-tyler-light font-sans selection:bg-accent-green selection:text-black">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-tyler-black/90 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono font-bold text-xl tracking-tighter hover:text-accent-green cursor-pointer">
            TW.com
          </div>
          <div className="flex gap-4 md:gap-6 font-mono text-xs md:text-sm">
            <a 
              href="#projects" 
              onClick={(e) => handleNavClick(e, 'projects')}
              className="hover:text-accent-blue transition-colors cursor-pointer uppercase"
            >
              Projects
            </a>
            <a 
              href="#arcade" 
              onClick={(e) => handleNavClick(e, 'arcade')}
              className="hover:text-white transition-colors text-accent-pink cursor-pointer uppercase"
            >
              Playground
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-accent-orange transition-colors cursor-pointer uppercase"
            >
              About
            </a>
            <a 
              href={SOCIALS.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent-blue font-bold hover:underline decoration-wavy"
            >
              @tylerwares
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <ChaosHero />

        {/* Info Marquee */}
        <div className="bg-accent-green text-black py-2 overflow-hidden border-y-2 border-black rotate-1 scale-105 my-10">
          <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] font-mono font-bold text-lg">
             BUILDING IN PUBLIC // AI ENTHUSIAST // FACTORY AUTOMATION // CRYPTO NATIVE // FESTIVAL GOER // OPTIMIZING EVERYTHING // 
             BUILDING IN PUBLIC // AI ENTHUSIAST // FACTORY AUTOMATION // CRYPTO NATIVE // FESTIVAL GOER // OPTIMIZING EVERYTHING // 
          </div>
        </div>

        {/* Projects */}
        <section id="projects" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-24">
          <h2 className="text-4xl md:text-6xl font-black mb-16 text-center">
            <span className="border-b-4 border-accent-blue">SHIP IT</span> OR DIE TRYING
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Game Arcade Section */}
        <section id="arcade" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-24 bg-gradient-to-b from-tyler-black to-tyler-dark">
           <div className="text-center mb-10">
              <h2 className="text-3xl font-mono font-bold text-white inline-block border-b-2 border-accent-pink pb-1">
                // DOPAMINE STATION
              </h2>
              <p className="text-gray-400 mt-2 text-sm">Wasting time efficiently.</p>
           </div>
           <GameArcade />
        </section>

        {/* Interests Section */}
        <section className="bg-tyler-dark border-y border-gray-800 py-20 relative overflow-hidden">
             {/* Background decoration */}
             <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
             </div>

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
              <h2 className="text-3xl font-mono font-bold mb-8 text-gray-400">
                // DIVERSE INPUTS = BETTER OUTPUTS
              </h2>
              <InterestsSection />
            </div>
        </section>

        {/* About / Bio */}
        <section id="about" className="max-w-4xl mx-auto px-6 py-24 scroll-mt-24">
          <div className="bg-black border border-gray-800 p-8 md:p-12 relative shadow-[16px_16px_0px_0px_rgba(30,30,30,1)]">
             <div className="absolute top-[-10px] left-[20px] bg-accent-orange text-black font-bold px-4 py-1 font-mono transform -rotate-2">
                ORIGIN STORY
             </div>
             
             <div className="prose prose-invert prose-lg max-w-none">
                <p className="font-mono text-accent-green mb-4">
                  &gt; console.log(tyler.status);
                </p>
                <p className="text-xl leading-relaxed mb-6">
                  I'm <span className="text-white font-bold bg-accent-blue/20 px-1">Tyler Wares</span>. 
                  By day, I automate factories—optimizing the physical world. By night, I build digital empires.
                </p>
                <p className="text-gray-400 mb-6">
                  I was that "gifted kid" who coasted for too long. Now, I'm relentlessly building my way out. 
                  Whether it's DIY home renos or coding the next big SaaS, I'm relentlessly seeking optimization.
                </p>
                <p className="text-gray-400">
                  You can find me exploring the intersection of <span className="text-accent-pink">Psychology</span> and <span className="text-accent-green">Finance</span>, 
                  or losing myself in the bass at an EDM festival. It's all connected.
                </p>
             </div>

             <div className="mt-10 flex gap-4 flex-wrap">
                <a 
                  href={SOCIALS.twitter}
                  className="bg-white text-black font-bold py-3 px-8 hover:bg-accent-blue hover:text-white transition-colors uppercase tracking-wider font-mono"
                >
                  Follow the Journey
                </a>
             </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-10 text-center font-mono text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Tyler Wares. Built with React + Chaos.</p>
          <p className="mt-2 text-xs">NO PURPLE WAS HARMED IN THE MAKING OF THIS WEBSITE.</p>
        </footer>
      </main>

      {/* AI Chatbot */}
      <ChatWidget />
      
      {/* Global Styles for Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default App;