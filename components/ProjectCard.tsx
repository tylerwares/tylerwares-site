import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={`
      relative group p-6 border-2 ${project.color} bg-tyler-dark 
      hover:bg-tyler-gray transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]
      cursor-pointer overflow-hidden
    `}>
      <div className="absolute top-0 right-0 p-2 opacity-50 text-xs font-mono uppercase tracking-widest">
        {project.status}
      </div>
      
      <h3 className="text-3xl font-bold mb-2 font-mono tracking-tighter uppercase break-words">
        {project.name}
      </h3>
      
      <p className="text-sm font-mono text-gray-400 mb-6">
        {project.domain}
      </p>
      
      <p className="text-gray-300 font-sans leading-relaxed">
        {project.description}
      </p>
      
      <div className={`
        absolute bottom-0 left-0 w-full h-1 bg-current transform scale-x-0 
        group-hover:scale-x-100 transition-transform duration-300 origin-left
      `} />
      
      {/* Glitch decoration on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-white mix-blend-overlay transition-opacity" />
    </div>
  );
};