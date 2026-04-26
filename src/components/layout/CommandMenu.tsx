import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";

interface Command {
  title: string;
  sub: string;
  key: string;
  action: () => void;
}

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cvUrl = `${import.meta.env.BASE_URL}Phat_Nguyen_CV.pdf`;

  const commands: Command[] = [
    { title: 'View Projects', sub: 'Jump to project case studies', key: '#projects', action: () => { window.location.hash = 'projects'; } },
    { title: 'Copy Email', sub: 'nhtruongphat.forwork@gmail.com', key: 'copy', action: () => { navigator.clipboard.writeText('nhtruongphat.forwork@gmail.com'); alert('Email copied!'); } },
    { title: 'Download CV', sub: 'Open or download Phat Nguyen CV PDF', key: 'cv', action: () => window.open(cvUrl, '_blank') },
    { title: 'Open LinkedIn', sub: 'linkedin.com/in/nhtruongphat', key: 'link', action: () => window.open('https://linkedin.com/in/nhtruongphat', '_blank') },
    { title: 'Open GitHub', sub: 'github.com/phat8507', key: 'link', action: () => window.open('https://github.com/phat8507', '_blank') },
    { title: 'Open Scrum/MBO Sheet', sub: 'Management sheet for the macroeconomics project', key: 'sheet', action: () => window.open('https://docs.google.com/spreadsheets/d/1J7qV3jRL2DzsedPfVXcWpT1usXZqI-f6/edit?usp=sharing&ouid=115062449513822083905&rtpof=true&sd=true', '_blank') },
    { title: 'Open Project Website', sub: 'MacroEco_N4_MarketFailure on GitHub Pages', key: 'site', action: () => window.open('https://phat8507.github.io/MacroEco_N4_MarketFailure/', '_blank') },
    { title: 'Go to Contact', sub: 'Email, LinkedIn, GitHub and location', key: '#contact', action: () => { window.location.hash = 'contact'; } },
    { title: 'Go to Skills', sub: 'Business, research, tools and languages', key: '#skills', action: () => { window.location.hash = 'skills'; } }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const combo = isMac ? e.metaKey && e.key.toLowerCase() === 'k' : e.ctrlKey && e.key.toLowerCase() === 'k';
      if (combo) {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 30);
      setQuery("");
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredCommands = commands.filter(c => 
    (c.title + ' ' + c.sub + ' ' + c.key).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[rgba(16,42,42,0.06)] backdrop-blur-sm" />
      
      <div 
        className="relative w-full max-w-[560px] rounded-[16px] shadow-[0_24px_64px_rgba(16,42,42,0.08)] backdrop-blur-md overflow-hidden flex flex-col"
        style={{ background: 'var(--glass-card-bg)', border: '1px solid var(--glass-card-border)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative" style={{ borderBottom: '1px solid var(--border-dark)' }}>
          <Search size={18} className="absolute left-[1.1rem] top-1/2 -translate-y-1/2 text-muted" />
          <input 
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent py-[1.1rem] pr-[1.1rem] pl-[3rem] text-[1rem] outline-none text-text" 
            placeholder="Search commands... (e.g., projects, email, cv)"
          />
        </div>
        <div className="max-h-[340px] overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((c, i) => (
              <button
                key={i}
                className="w-full text-left p-[0.7rem_0.9rem] rounded-[8px] transition-colors hover:bg-accent-soft focus:bg-accent-soft outline-none group flex items-center justify-between gap-3"
                onClick={() => {
                  c.action();
                  onClose();
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[0.88rem] font-medium text-text group-hover:text-accent transition-colors">{c.title}</div>
                  <div className="text-[0.75rem] text-muted truncate mt-[2px]">{c.sub}</div>
                </div>
                <div className="text-[0.7rem] px-[6px] py-[2px] rounded-[4px] text-muted shrink-0" style={{ background: 'var(--border)' }}>
                  {c.key}
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-[0.85rem] text-muted">
              No matching action. Try projects, email, LinkedIn, GitHub or sheet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
