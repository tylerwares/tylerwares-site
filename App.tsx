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
      <nav className="fixed top-0 left-0 w-full z-[100] bg-tyler-black/90 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="font-mono font-bold text-xl tracking-tighter hover:text-accent-green cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            TW.com
          </div>
          <div className="flex gap-4 md:gap-6 font-mono text-xs md:text-sm">
            <a 
              href="#projects" 
              onClick={(e) => handleNavClick(e, 'projects')}
              className="hover:text-accent-blue transition-colors cursor-pointer uppercase font-bold"
            >
              Projects
            </a>
            <a 
              href="#arcade" 
              onClick={(e) => handleNavClick(e, 'arcade')}
              className="hover:text-white transition-colors text-accent-pink cursor-pointer uppercase font-bold"
            >
              Playground
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-accent-orange transition-colors cursor-pointer uppercase font-bold"
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
        {/* Hero (Includes Marquee) */}
        <ChaosHero />

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
              <p className="text-gray-400 mt-4 font-mono text-sm">
                WARNING: HIGHLY ADDICTIVE. PROCEED WITH CAUTION.
              </p>
           </div>
           <GameArcade />
        </section>

        {/* About / Interests */}
        <section id="about" className="max-w-4xl mx-auto px-6 py-20 scroll-mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">
            THE <span className="text-accent-orange">RENMAN</span> STACK
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            From factory floors to blockchain explorers. I optimize systems, build cool shit, and chase bass drops.
          </p>
          <InterestsSection />
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-10 text-center font-mono text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Tyler Wares. All systems nominal.</p>
          <p className="mt-2">Built with chaos & caffeine.</p>
        </footer>
      </main>
      
      <ChatWidget />
    </div>
  );
};

export default App;