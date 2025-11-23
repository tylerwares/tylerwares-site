import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "SYSTEM_BOOT... I am Tyler's Automated Assistant. I have 0% AI and 100% hardcoded logic. Ask me about 'projects', 'music', or 'tyler'." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getStaticResponse = (text: string): string => {
    const lower = text.toLowerCase();
    
    if (lower.includes('project') || lower.includes('tweetable') || lower.includes('wallet') || lower.includes('lead')) {
      return "Tyler is building Tweetable.app (Twitter growth), WalletGlass.io (Crypto transparency), and LeadSaver.ca. He never sleeps.";
    }
    if (lower.includes('music') || lower.includes('edm') || lower.includes('festival')) {
      return "Bass capital resident. If it's not 140BPM or higher, is it even music? Ask him about his next festival.";
    }
    if (lower.includes('factory') || lower.includes('automation') || lower.includes('work')) {
      return "By day: Optimizing factories. By night: Optimizing DOM elements. He loves efficiency.";
    }
    if (lower.includes('crypto') || lower.includes('coin')) {
      return "He's a crypto native. Probably looking at charts right now. Have you played 'Paper Hands' in the playground above?";
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('yo')) {
      return "Beep boop. Hello human. I am a script.";
    }
    if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
      return "Best way to reach him is Twitter @tylerwares. Slide into the DMs.";
    }
    
    const randomFallbacks = [
      "I don't have an AI brain anymore (budget cuts). Try asking about 'projects'.",
      "Error 404: Intelligence not found. Try asking about 'music'.",
      "I'm just a glorified if/else statement. Ask me about 'automation'.",
      "My creator didn't program a response for that. Chaos reigns.",
    ];
    return randomFallbacks[Math.floor(Math.random() * randomFallbacks.length)];
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    // Simulate network delay for effect
    setTimeout(() => {
        const response = getStaticResponse(userMsg);
        setMessages(prev => [...prev, { role: 'model', text: response }]);
        setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] md:w-80 bg-tyler-dark border-2 border-accent-green shadow-[8px_8px_0px_0px_rgba(0,255,148,0.2)] flex flex-col h-96">
          <div className="bg-accent-green p-2 flex justify-between items-center text-black font-bold font-mono">
            <span>AUTOBOT_V1.exe</span>
            <button onClick={() => setIsOpen(false)} className="hover:text-white">X</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-2 ${
                  msg.role === 'user' 
                    ? 'bg-tyler-gray text-white border border-gray-600' 
                    : 'bg-black text-accent-green border border-accent-green'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-black text-accent-green border border-accent-green p-2 animate-pulse">
                  Computing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-gray-700 bg-black flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask keyword..."
              className="flex-1 bg-transparent text-white outline-none font-mono text-sm px-2"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className="text-accent-green hover:text-white px-2 font-bold"
            >
              &gt;
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          h-14 w-14 rounded-none bg-black border-2 border-white text-white flex items-center justify-center
          hover:bg-accent-green hover:text-black hover:border-accent-green hover:scale-110 transition-all duration-300
          shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]
        `}
      >
        {isOpen ? (
          <span className="font-bold text-xl">X</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};