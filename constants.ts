import { Project, Interest } from './types';

export const TYLER_BIO = `
Tyler Wares is a modern-day Renaissance man based in the digital realm.
Professionally, he automates factories (9-5) but spends his free time building in public (@tylerwares).
A former gifted kid reclaiming his potential.
He owns tweetable.app, walletglass.io, and leadsaver.ca.
Interests include AI, crypto, home renovations (DIY), optimization, music festivals, EDM, psychology, finances, and psychedelics.
His vibe is chaotic good, high energy, and relentlessly curious.
`;

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Tweetable',
    domain: 'tweetable.app',
    description: 'Making tweets more shareable and impactful. The ultimate tool for Twitter growth.',
    status: 'Building',
    color: 'border-accent-blue text-accent-blue',
  },
  {
    id: '2',
    name: 'WalletGlass',
    domain: 'walletglass.io',
    description: 'Transparent insights into your crypto portfolio. See clearly through the blockchain.',
    status: 'Concept',
    color: 'border-accent-green text-accent-green',
  },
  {
    id: '3',
    name: 'LeadSaver',
    domain: 'leadsaver.ca',
    description: 'Saving leads from the abyss. Automation tools for savvy business owners.',
    status: 'Live',
    color: 'border-accent-orange text-accent-orange',
  },
];

export const INTERESTS: Interest[] = [
  { name: 'Artificial Intelligence', category: 'Tech' },
  { name: 'Crypto & Web3', category: 'Tech' },
  { name: 'Factory Automation', category: 'Tech' },
  { name: 'DIY / Home Reno', category: 'Lifestyle' },
  { name: 'Optimization', category: 'Lifestyle' },
  { name: 'Personal Finance', category: 'Lifestyle' },
  { name: 'Fitness', category: 'Lifestyle' },
  { name: 'EDM', category: 'Music' },
  { name: 'Music Festivals', category: 'Music' },
  { name: 'Psychology', category: 'Mind' },
  { name: 'Psychedelics', category: 'Mind' },
];

export const SOCIALS = {
  twitter: 'https://twitter.com/tylerwares',
  website: 'https://tylerwares.com',
};